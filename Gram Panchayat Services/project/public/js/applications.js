class ApplicationManager {
    static async apply(serviceId) {
        try {
            const response = await fetch('/api/applications', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ service_id: serviceId })
            });
            
            if (!response.ok) throw new Error('Failed to submit application');
            
            const result = await response.json();
            alert('Application submitted successfully!');
            return result;
        } catch (error) {
            console.error('Error submitting application:', error);
            throw error;
        }
    }

    static async getApplicationStatus(applicationId) {
        try {
            const response = await fetch(`/api/applications/status/${applicationId}`);
            if (!response.ok) throw new Error('Failed to fetch application status');
            return await response.json();
        } catch (error) {
            console.error('Error fetching application status:', error);
            throw error;
        }
    }
}