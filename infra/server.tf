resource "azurerm_subnet" "snet1" {
  name                 = "backend-snet"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.2.0/24"]
}

# ============================================================
# NAT GATEWAY PUBLIC IP
# Used only for OUTBOUND internet access
# ============================================================

resource "azurerm_public_ip" "natpip" {
  name                = "${var.prefix}-nat-pip"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
  sku                 = "Standard"
}

# ============================================================
# NAT GATEWAY
# ============================================================

resource "azurerm_nat_gateway" "backend_nat" {
  name                = "${var.prefix}-backend-nat"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "Standard"
}

# ============================================================
# NAT GATEWAY → PUBLIC IP
# ============================================================

resource "azurerm_nat_gateway_public_ip_association" "backend_nat_assoc" {
  nat_gateway_id       = azurerm_nat_gateway.backend_nat.id
  public_ip_address_id = azurerm_public_ip.natpip.id
}

resource "azurerm_network_interface" "nic1" {
  name                = "${var.prefix}-nic1"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  ip_configuration {
    name                          = "testconfiguration2"
    subnet_id                     = azurerm_subnet.snet1.id
    private_ip_address_allocation = "Dynamic"
  }
}

resource "azurerm_virtual_machine" "backendvm" {
  name                  = "${var.prefix}-vm-backend"
  location              = azurerm_resource_group.rg.location
  resource_group_name   = azurerm_resource_group.rg.name
  network_interface_ids = [azurerm_network_interface.nic1.id]
  vm_size               = "Standard_D2ads_v7"

  # Uncomment this line to delete the OS disk automatically when deleting the VM
  # delete_os_disk_on_termination = true

  # Uncomment this line to delete the data disks automatically when deleting the VM
  # delete_data_disks_on_termination = true

  storage_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }
  storage_os_disk {
    name              = "myosdisk2"
    caching           = "ReadWrite"
    create_option     = "FromImage"
    managed_disk_type = "Standard_LRS"
  }
  os_profile {
    computer_name  = "hostname"
    admin_username = var.vm_username
    admin_password = var.vm_password
  }
  os_profile_linux_config {
    disable_password_authentication = false
  }
}

resource "azurerm_network_security_group" "nsg1" {
  name                = "acceptanceTestSecurityGroup2"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  security_rule {
    name                       = "httprule1"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "10.0.1.0/24"
    destination_address_prefix = "*"
  }
}

resource "azurerm_subnet_network_security_group_association" "backend" {
  subnet_id                 = azurerm_subnet.snet1.id
  network_security_group_id = azurerm_network_security_group.nsg1.id
}
# ============================================================
# NAT GATEWAY → BACKEND SUBNET
# Provides outbound internet access to backend VM
# ============================================================

resource "azurerm_subnet_nat_gateway_association" "backend_nat_subnet" {
  subnet_id      = azurerm_subnet.snet1.id
  nat_gateway_id = azurerm_nat_gateway.backend_nat.id
}