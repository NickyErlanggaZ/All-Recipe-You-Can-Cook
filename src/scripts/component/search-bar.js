class SearchBar extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <div id="search-content">
                <div class="container py-5">
                    <div class="text-center">
                        <h3>Search recipe what you want to cook</h3>
                    </div>
                    <div class="input-group mb-3">
                        <input type="text" id="search-input" class="form-control" placeholder="Search by food name" />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button" id="search-button">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
customElements.define("search-bar", SearchBar);