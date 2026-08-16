# 🛒 Architecture of the Application

TestnSolve is a MERN-based e-commerce application deployed on **Microsoft Azure** using a secure three-tier architecture. The infrastructure is provisioned using **Terraform**, and the application is containerized using **Docker**.

---

## 🏗️ Architecture Components

- 🎨 **Frontend:** React/Vite + Nginx + Docker
- ⚙️ **Backend:** Node.js/Express + Docker
- 🗄️ **Database:** MongoDB Atlas
- ☁️ **Cloud:** Microsoft Azure
- 🏗️ **Infrastructure:** Terraform
- 🐳 **Container Registry:** Docker Hub
- 🔐 **Security:** Network Security Groups + Azure Bastion
- 🌐 **Networking:** Azure VNet + NAT Gateway
- 📊 **Monitoring:** Azure Monitor

---

## 📐 Architecture Diagram

<img width="1219" height="817" alt="image" src="https://github.com/user-attachments/assets/3294e4fb-b099-44a9-957e-b0a028ee198c" />


## ☁️ Azure Infrastructure

The application is deployed inside an Azure Resource Group with:

- 🌐 Azure Virtual Network: `10.0.0.0/16`
- 🎨 Frontend Subnet: `10.0.1.0/24`
- ⚙️ Backend Subnet: `10.0.2.0/24`
- 🔐 `AzureBastionSubnet`
- 🖥️ Frontend Linux VM
- 🖥️ Backend Linux VM
- 🛡️ Network Security Groups
- 🌍 Azure Public IP
- 🔄 Azure NAT Gateway
- 🔐 Azure Bastion
- 📊 Azure Monitor

---

## 🎨 Frontend

The React/Vite frontend runs inside a Docker container on an Azure Linux VM.

**Docker Image:**

```text
srijantripathi122/testnsolve-frontend:v3
```

**Nginx** serves the React application and handles HTTPS traffic.

---

## ⚙️ Backend

The Node.js/Express backend runs inside a Docker container on a **private Azure Linux VM**.

**Docker Image:**

```text
srijantripathi122/testnsolve-backend:v1
```

**Application Port:** `4000`

The backend is not directly exposed to public inbound traffic.

---

## 🗄️ Database

**MongoDB Atlas** is used as the managed database service.

Main collections include:

- 👤 Users
- 📦 Products
- 🛒 Orders
- 🛍️ Cart

Only the backend communicates with MongoDB Atlas.

---

## 🔄 NAT Gateway

Azure NAT Gateway is attached to the **Backend Subnet** and provides outbound internet connectivity for private resources.

Common use cases:

- 🐳 Pulling Docker images
- 🌐 Accessing external APIs
- 🔄 System updates
- 📦 Package installations

NAT Gateway provides **outbound-only connectivity** and does not expose the backend to inbound internet traffic.

---

## 🔐 Azure Bastion

Azure Bastion provides secure browser-based administrative access to Azure VMs.

### Benefits

- 🔒 No public SSH access
- 🚫 No exposed port `22`
- 🛡️ Secure VM management through Azure Portal
- 🔑 Access to private VM IPs

---

## 🛡️ Network Security

Network Security Groups (NSGs) control traffic between resources.

Security practices include:

- 🔒 HTTPS for frontend traffic
- 🔐 Private backend infrastructure
- 🚫 Restricted inbound access
- 🛡️ Secure VM access through Azure Bastion
- 🔒 No direct MongoDB exposure
- 🌐 Controlled outbound access through NAT Gateway

---

## 🐳 Docker & Docker Hub

Both application tiers are containerized using Docker.

### Frontend

`React/Vite → Docker Build → Docker Hub → Azure VM → Container`

### Backend

`Node.js/Express → Docker Build → Docker Hub → Azure VM → Container`

Docker Hub is used for **container image storage and distribution**.

---

## 🏗️ Terraform

Terraform is used as **Infrastructure as Code (IaC)** to provision:

- 📦 Resource Group
- 🌐 Virtual Network
- 🔹 Subnets
- 🛡️ Network Security Groups
- 🖥️ Linux VMs
- 🌍 Public IPs
- 🔄 NAT Gateway
- 🔐 Azure Bastion

Terraform enables repeatable and automated infrastructure deployment.

---

## 📊 Monitoring

Azure Monitor is used for:

- 📈 VM metrics
- 💻 CPU and memory usage
- 🌐 Network monitoring
- 📝 Application logs
- 🌐 Nginx logs
- 🐳 Docker container logs

---

## 🔄 Application Flow

`👤 User → 🌐 Nginx/React Frontend → ⚙️ Private Node.js Backend → 🗄️ MongoDB Atlas`

### 🌐 Backend Outbound Traffic

`⚙️ Backend VM → 🔄 NAT Gateway → 🌍 Internet`

### 🔐 Administrative Access

`👨‍💻 Administrator → ☁️ Azure Portal → 🔐 Azure Bastion → 🖥️ Private VM`

---

## 🧰 Technology Stack

### Application

- ⚛️ React
- ⚡ Vite
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB

### Azure Services

- ☁️ Azure Virtual Network
- 🖥️ Azure Linux VMs
- 🔐 Azure Bastion
- 🔄 Azure NAT Gateway
- 🛡️ Network Security Groups
- 📊 Azure Monitor
- 🗄️ MongoDB Atlas

### DevOps

- 🐳 Docker
- 📦 Docker Hub
- 🏗️ Terraform
- 🌐 Nginx
- 🔧 Git

---

## 🚀 Key Benefits

- 🏗️ Secure three-tier architecture
- 🔐 Private backend infrastructure
- 🛡️ Secure VM administration with Azure Bastion
- 🌐 Controlled outbound internet access using NAT Gateway
- 🐳 Containerized deployments with Docker
- 🏗️ Automated infrastructure with Terraform
- 🔒 Network isolation using subnets and NSGs
- 🗄️ Managed database using MongoDB Atlas
- 📊 Infrastructure monitoring through Azure Monitor
