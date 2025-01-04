class Auth {
    static async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            if (!response.ok) throw new Error('Login failed');
            
            const data = await response.json();
            localStorage.setItem('userRole', data.role);
            return data.role;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static logout() {
        localStorage.removeItem('userRole');
        window.location.href = '/';
    }

    static getUserRole() {
        return localStorage.getItem('userRole');
    }

    static isAuthenticated() {
        return !!this.getUserRole();
    }

    static isAdmin() {
        return this.getUserRole() === 'admin';
    }

    static isStaff() {
        return this.getUserRole() === 'staff';
    }
}