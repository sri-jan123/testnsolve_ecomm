terraform {
  backend "azurerm" {
    resource_group_name  = "rg-varstore"
    storage_account_name = "tfstore0122"
    container_name       = "tfstate"
    key                  = "dev.terraform.tfstate"

    use_azuread_auth = true
  }
}

