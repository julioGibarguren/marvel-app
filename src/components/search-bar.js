import { LitElement, html } from 'lit';

export class SearchBar extends LitElement {
    static get properties() {
        return {
            searhFilter: { type: String }
        }
    }

    constructor() {
        super()
        
    }

    firstUpdated() {
        this.searhFilter = this.shadowRoot.querySelector("#form").value
    }

    sendValue() {
        this.searhFilter = this.shadowRoot.querySelector("#form").value
        console.log(this.searhFilter)
    }

    render() {
        return html`
            <input type="text" id="form">
            <button @click="${this.sendValue}">search</button>
        `;
    }




}

customElements.define('search-bar', SearchBar);
