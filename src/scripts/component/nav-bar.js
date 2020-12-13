class NavBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container">
                    <a class="navbar-brand" id="home-logo">ARYCC</a>
                    <button class="navbar-toggler"
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link" id="home">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="search">Search</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" 
                                    href="#" 
                                    id="navbarDropdownMenuLink" 
                                    role="button"
                                    data-toggle="dropdown" 
                                    aria-haspopup="true" 
                                    aria-expanded="false">
                                        Category
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" id="category-input"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        `
    }
}
customElements.define("nav-bar", NavBar);