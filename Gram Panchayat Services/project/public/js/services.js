class ServicesManager {
    static async getServices() {
        try {
            const response = await fetch('/api/services');
            if (!response.ok) throw new Error('Failed to fetch services');
            return await response.json();
        } catch (error) {
            console.error('Error fetching services:', error);
            throw error;
        }
    }

    static async createService(serviceData) {
        try {
            const response = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(serviceData)
            });
            
            if (!response.ok) throw new Error('Failed to create service');
            return await response.json();
        } catch (error) {
            console.error('Error creating service:', error);
            throw error;
        }
    }

    static renderServicesList(services, container) {
        container.innerHTML = services.map(service => `
            <div class="card">
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <div class="requirements">
                    <h4>Requirements:</h4>
                    <p>${service.requirements}</p>
                </div>
                ${Auth.isAuthenticated() && !Auth.isAdmin() ? `
                    <button class="btn btn-primary" onclick="ApplicationManager.apply(${service.id})">
                        Apply
                    </button>
                ` : ''}
                ${Auth.isAdmin() ? `
                    <button class="btn btn-danger" onclick="ServicesManager.deleteService(${service.id})">
                        Delete
                    </button>
                ` : ''}
            </div>
        `).join('');
    }
}