class Router {
    static navigate(page) {
        window.history.pushState({}, '', `#${page}`);
        this.loadPage(page);
    }

    static async loadPage(page) {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = '';
        
        switch(page) {
            case 'home':
                mainContent.innerHTML = HomePage.render();
                HomePage.loadPopularServices();
                break;
                
            case 'services':
                mainContent.innerHTML = await ServicesPage.render();
                ServicesPage.initialize();
                break;
                
            case 'login':
                mainContent.innerHTML = `
                    <div class="card">
                        <h2>Login</h2>
                        <form id="login-form">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" required>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                `;
                
                document.getElementById('login-form')?.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        await Auth.login(
                            document.getElementById('username').value,
                            document.getElementById('password').value
                        );
                        this.updateNavigation();
                        this.navigate('home');
                    } catch (error) {
                        alert('Login failed');
                    }
                });
                break;
                
            default:
                this.navigate('home');
        }
    }

    static updateNavigation() {
        const authLinks = document.getElementById('auth-links');
        if (Auth.isAuthenticated()) {
            const role = Auth.getUserRole();
            authLinks.innerHTML = `
                <span>Welcome, ${role}</span>
                <a href="#" class="nav-link" onclick="Auth.logout()">Logout</a>
            `;
        } else {
            authLinks.innerHTML = `
                <a href="#" class="nav-link" data-page="login">Login</a>
            `;
        }
    }
}