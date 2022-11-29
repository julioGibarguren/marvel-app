import { LitElement,html,css } from 'lit';
import { connect } from 'pwa-helpers';
import { store } from '../store/store';
import { map } from 'lit/directives/map.js';

import './get-data';

export class HeroResources extends connect(store)(LitElement) {

    static get properties() {
        return {
            offset: { type: Number },
            limit: { type: Number },
            total: { type: Number },
            items: { type: Array },
            resource: { type: String }
        };
    }

    constructor() {
        super()
        this.items = []
        this.getData()
    }

    firstUpdate() {
        this.getData()
    }

    stateChanged(state) {
        this.hero = state.hero;
    }

    getData() {
        this.addEventListener('ApiData', (e) => {
            this.items = e.detail.data
            console.log(e)
        })
    }

    showImage(img) {
        if (img) {
            return html `
            <img class="character-portrait" src="${img.path}/portrait_incredible.${img.extension}" alt=""> `
        } else {
            return html ``
        }
    }

    isSeries(resource) {
        if (resource == "stories") {
            return "stories-container"
        } else {
            return ""
        }
    }

    seriesDescription(resource, item) {
        if (resource == "stories") {
            return html `
            <p>${item.description}</p>
            `
        } else {
            return html ``
        }
    }

    render() {
        return html `
        <get-data baseUrl="http://gateway.marvel.com/v1/public/characters/${this.hero.id}/${this.resource}?" limit=${this.limit}></get-data>
        <div class="main-list">
            <div class="cards ${this.isSeries(this.resource)}">
                ${map(this.items, (item) => html`
                <div class="card" @click=${() => this.openDetail(character)} href="/detail:${item.id}">
                    ${this.showImage(item.thumbnail)}
                    <div class="item-data" >
                    <h4>${item.title}</h4>
                    ${this.seriesDescription(this.resource, item)}
                    </div>
                </div>`)}
            </div>
        </div>
        `
    }

    static styles = [
        css `
            :host {
                display: block;
            }

            .cards {
                display: flex;
                flex-wrap: wrap
            }

            .card{ 
                width: 45%;
                margin: 2%;
                background-color: rgb(0, 0, 0);
                position: relative;
                overflow: hidden;
                height: 231px;
                border-radius: 3px;
            }

            .card img {
                width:100%;
                object-fit: cover;
            }

            .item-data {
                padding: 7px 11px;
                font-size: 13px;
                line-height: normal;
                color: white;
                position: absolute;
                background-color: rgba(0,0,0,0.8);
                left: 0;
                right: 0;
                bottom: 0;
                min-height: 50px;
                display:flex;
                align-items: center;
            }

            .item-data p, .item-data h4 {
                color: #f3f3f3;
                margin-top: 0;
                font-size:13px;
                line-height: normal;
                margin-bottom: 0;
            }

            .cards.stories-container {
                display: flex;
                
            }

            .cards.stories-container .card {
                background-color: transparent;
                width: 100%;
                height: auto;
                box-shadow: rgb(0 0 0 / 30%) 0px 0px 5px; 
            }

            .cards.stories-container .card .item-data {
                background-color: transparent;
                height: auto;
                position: relative;
                flex-direction: column;
                align-items: flex-start;
            }

            .cards.stories-container .card .item-data p, 
            .cards.stories-container .card .item-data h4 {
                color:#333333;
            }

            .cards.stories-container .card .item-data h4 {
                font-size: 17px;
                margin-bottom:16px;
            }

            
            @media (min-width: 1024px) {
                .card{ 
                    width: 12%;
                    margin: 1%;
                    height: auto;

                }

                .cards.stories-container .card {
                    width: 23%;
                }
            }

        `
    ];

}
customElements.define('hero-resources', HeroResources);