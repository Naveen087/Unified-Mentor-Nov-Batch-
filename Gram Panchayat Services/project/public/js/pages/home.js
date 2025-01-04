class HomePage {
    static render() {
        return `
            <div class="hero-section card">
                <h1>Welcome to Gram Panchayat E-Services</h1>
                <p class="subtitle">Your gateway to digital government services</p>
                
                <div class="features-grid">
                    <div class="feature">
                        <h3>Easy Applications</h3>
                        <p>Apply for government services and schemes online from the comfort of your home</p>
                    </div>
                    <div class="feature">
                        <h3>Track Status</h3>
                        <p>Monitor your application status in real-time</p>
                    </div>
                    <div class="feature">
                        <h3>Digital Records</h3>
                        <p>Access your documents and certificates digitally</p>
                    </div>
                </div>
            </div>

            <div class="quick-links card">
                <h2>Popular Services</h2>
                <div class="services-grid" id="popular-services">
                    Loading popular services...
                </div>
            </div>

            <div class="info-section card">
                <h2>Important Information</h2>
                <div class="announcements">
                    <div class="announcement">
                        <h4>Working Hours</h4>
                        <p>Monday to Saturday: 9:00 AM to 5:00 PM</p>
                    </div>
                    <div class="announcement">
                        <h4>Helpline</h4>
                        <p>Toll Free: 1800-XXX-XXXX</p>
                    </div>
                    <div class="announcement">
                        <h4>Emergency Contact</h4>
                        <p>Panchayat Office: 0123-456789</p>
                    </div>
                </div>
            </div>
        `;
    }

    static async loadPopularServices() {
        try {
            const services = await ServicesManager.getServices();
            // Show first 3 services as popular
            const popularServices = services.slice(0, 3);
            const container = document.getElementById('popular-services');
            
            container.innerHTML = popularServices.map(service => `
                <div class="service-card card">
                    <h3>${service.name}</h3>
                    <p>${service.description}</p>
                    <button class="btn btn-primary" onclick="Router.navigate('services')">Learn More</button>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading popular services:', error);
            document.getElementById('popular-services').innerHTML = 'Failed to load services';
        }
    }
}