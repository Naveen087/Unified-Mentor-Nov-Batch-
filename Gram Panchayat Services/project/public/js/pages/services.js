class ServicesPage {
  static async render() {
    const services = await ServicesManager.getServices();
    return `
            <div class="services-header card">
                <h1>Available Services</h1>
                <div class="search-box">
                    <input type="text" id="service-search" placeholder="Search services...">
                </div>
                ${
                  Auth.isAdmin()
                    ? `
                    <button class="btn btn-primary" onclick="ServicesPage.showAddServiceForm()">
                        Add New Service
                    </button>
                `
                    : ""
                }
            </div>

            <div class="services-grid">
                ${services
                  .map((service) => this.renderServiceCard(service))
                  .join("")}
            </div>

            ${this.renderAddServiceModal()}
        `;
  }

  static renderServiceCard(service) {
    return `
            <div class="service-card card">
                <div class="service-header">
                    <h3>${service.name}</h3>
                    ${
                      Auth.isAdmin()
                        ? `
                        <div class="admin-controls">
                            <button class="btn btn-danger" onclick="ServicesManager.deleteService(${service.id})">
                                Delete
                            </button>
                        </div>
                    `
                        : ""
                    }
                </div>
                
                <div class="service-content">
                    <p>${service.description}</p>
                    
                    <div class="requirements-section">
                        <h4>Requirements:</h4>
                        <ul>
                            ${service.requirements
                              .split("\n")
                              .map(
                                (req) => `
                                <li>${req}</li>
                            `
                              )
                              .join("")}
                        </ul>
                    </div>

                    ${
                      Auth.isAuthenticated() && !Auth.isAdmin()
                        ? `
                        <button class="btn btn-primary" onclick="ApplicationManager.apply(${service.id})">
                            Apply Now
                        </button>
                    `
                        : ""
                    }
                </div>
            </div>
        `;
  }

  static renderAddServiceModal() {
    return Auth.isAdmin()
      ? `
            <div id="add-service-modal" class="modal" style="display: none;">
                <div class="modal-content card">
                    <h2>Add New Service</h2>
                    <form id="add-service-form">
                        <div class="form-group">
                            <label for="service-name">Service Name</label>
                            <input type="text" id="service-name" required>
                        </div>
                        <div class="form-group">
                            <label for="service-description">Description</label>
                            <textarea id="service-description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="service-requirements">Requirements (one per line)</label>
                            <textarea id="service-requirements" required></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary">Add Service</button>
                            <button type="button" class="btn btn-secondary" onclick="ServicesPage.hideAddServiceForm()">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `
      : "";
  }

  static showAddServiceForm() {
    const modal = document.getElementById("add-service-modal");
    if (modal) modal.style.display = "block";
  }

  static hideAddServiceForm() {
    const modal = document.getElementById("add-service-modal");
    if (modal) modal.style.display = "none";
  }

  static initialize() {
    // Add search functionality
    const searchInput = document.getElementById("service-search");
    if (searchInput) {
      searchInput.addEventListener("input", this.handleSearch);
    }

    // Add service form submission
    const addServiceForm = document.getElementById("add-service-form");
    if (addServiceForm) {
      addServiceForm.addEventListener("submit", this.handleAddService);
    }
  }

  static handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card) => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(searchTerm) ? "block" : "none";
    });
  }

  static async handleAddService(event) {
    event.preventDefault();

    const serviceData = {
      name: document.getElementById("service-name").value,
      description: document.getElementById("service-description").value,
      requirements: document.getElementById("service-requirements").value,
    };

    try {
      await ServicesManager.createService(serviceData);
      ServicesPage.hideAddServiceForm();
      Router.navigate("services");
    } catch (error) {
      alert("Failed to add service");
    }
  }
}
