import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import logo from "../assets/marvel-logo.svg";


export class AppHeader extends LitElement {

    goHome() {
        Router.go("/")
    }

    render() {
        return html`
        <header><img src="${logo}" @click=${this.goHome} alt="Marvel logo"/></header>
        `;
    }

    
    static styles = [
        css `
        header {
            position: fixed;
            top: 0px;
            left: 0px;
            right: 0px;
            height: 52px;
            z-index: 1;
            background-color: #202020;
            box-shadow: rgb(0 0 0 / 20%) 0px 6px 6px;
            text-align:center;
        }

        a {
            color: #ffffff;
            text-decoration: none;
        }
        `
    ];
}

customElements.define('app-header', AppHeader);
