resource "azurerm_subnet" "snetbackend" {
  name                 = "backend"
  resource_group_name  = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes     = ["10.0.2.0/24"]
}

resource "azurerm_public_ip" "lbpip" {
  name                = "PublicIPForLB"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  allocation_method   = "Static"
}

resource "azurerm_lb" "backend_lb" {
  name                = "TestLoadBalancer"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name

  frontend_ip_configuration {
    name                          = "backend-private-ip"
    subnet_id                     = azurerm_subnet.snetbackend.id
    private_ip_address_allocation = "Dynamic"
  }
}

#health probe
resource "azurerm_lb_backend_address_pool" "backend_pool" {
  name            = "backend-pool"
  loadbalancer_id = azurerm_lb.backend_lb.id
}

resource "azurerm_lb_probe" "backend_probe" {
  name            = "backend-health-probe"
  loadbalancer_id = azurerm_lb.backend_lb.id
  protocol        = "Tcp"
  port            = 4000
}

resource "azurerm_lb_rule" "backend_rule" {
  name                           = "backend-rule"
  loadbalancer_id                = azurerm_lb.backend_lb.id
  protocol                       = "Tcp"
  frontend_port                  = 5173
  backend_port                   = 4000
  frontend_ip_configuration_name = "backend-private-ip"
  backend_address_pool_ids       = [
    azurerm_lb_backend_address_pool.backend_pool.id
  ]
  probe_id = azurerm_lb_probe.backend_probe.id
}

resource "azurerm_linux_virtual_machine_scale_set" "backendvmss" {
  name                = "${var.prefix}-backend-vmss"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard_D2ads_v7"
  instances           = 1
  admin_username      = "adminuser"

admin_ssh_key {
    username   = "adminuser"
    public_key = file("C:/Users/srija/.ssh/bastion_test.pub")
  }

source_image_reference {
    publisher = "Canonical"
    offer     = "ubuntu-24_04-lts"
    sku       = "server"
    version   = "latest"
  }

os_disk {
    storage_account_type = "Standard_LRS"
    caching              = "ReadWrite"
  }

  network_interface {
    name    = "backendnic"
    primary = true

    ip_configuration {
      name      = "internal"
      primary   = true
      subnet_id = azurerm_subnet.snetbackend.id
      load_balancer_backend_address_pool_ids = [azurerm_lb_backend_address_pool.backend_pool.id]
    }
  }
}


