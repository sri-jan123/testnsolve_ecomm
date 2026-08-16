resource "azurerm_monitor_action_group" "mg" {
  name                = "CriticalAlertsAction"
  resource_group_name = azurerm_resource_group.rg.name
  short_name          = "p0action"

    email_receiver {
    name                    = "sendtoadmin"
    email_address           = "srijantripathi55@gmail.com"
    use_common_alert_schema = true
  }
}

#CPU alert for backend
resource "azurerm_monitor_metric_alert" "test" {
  name                = "CPU-metricalert-backend"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_virtual_machine.backendvm.id]
  description         = "Action will be triggered when CPU is greater than 60"

  criteria {
    metric_namespace = "Microsoft.Compute/virtualMachines"
    metric_name      = "Percentage CPU"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 60
  }

  action {
    action_group_id = "${azurerm_monitor_action_group.mg.id}"
  }
}

#Disk alert for backend
resource "azurerm_monitor_metric_alert" "disk" {
  name                = "Disk-metricalert-backend"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_virtual_machine.backendvm.id]
  description         = "Action will be triggered when free disk space is less than 20"

  criteria {
    metric_namespace = "Microsoft.Compute/virtualMachines"
    metric_name      = "Available Memory Bytes"
    aggregation      = "Average"
    operator         = "LessThan"
    threshold        = 20
  }

  action {
    action_group_id = "${azurerm_monitor_action_group.mg.id}"
  }
}

#CPU alert for frontend
resource "azurerm_monitor_metric_alert" "frontendtest" {
  name                = "CPU-metricalert-frontend"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_virtual_machine.main.id]
  description         = "Action will be triggered when CPU is greater than 60"

  criteria {
    metric_namespace = "Microsoft.Compute/virtualMachines"
    metric_name      = "Percentage CPU"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 60
  }

  action {
    action_group_id = "${azurerm_monitor_action_group.mg.id}"
  }
}

resource "azurerm_monitor_metric_alert" "frontenddisk" {
  name                = "Disk-metricalert-frontend"
  resource_group_name = azurerm_resource_group.rg.name
  scopes              = [azurerm_virtual_machine.main.id]
  description         = "Action will be triggered when free disk space is less than 20"

  criteria {
    metric_namespace = "Microsoft.Compute/virtualMachines"
    metric_name      = "Available Memory Bytes"
    aggregation      = "Average"
    operator         = "LessThan"
    threshold        = 20
  }

  action {
    action_group_id = "${azurerm_monitor_action_group.mg.id}"
  }
}