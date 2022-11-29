import { LitElement, html } from 'lit';

export class SearchBar extends LitElement {
    static get properties() {
        return {
            searchValue: { type: String }
        }
    }

    constructor() {
        super()
        
    }

    firstUpdated() {
        this.searchValue = this.shadowRoot.querySelector("#form").value
    }

    sendValue() {
        this.searhFilter = this.shadowRoot.querySelector("#form").value
        console.log(this.searhFilter)
    }

    render() {
        return html`
            <get-data baseUrl="http://gateway.marvel.com/v1/public/characters?nameStartWith=${this.searchValue}"  limit="${this.limit}"></get-data>
            <input type="text" id="form">
            <button @click="${this.sendValue}">search</button>
        `;
    }




}

customElements.define('search-bar', SearchBar);
