import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
import { store } from '../store/store';

import '../components/header';
import '../components/hero-resources';

export class CharDetail extends  connect(store)(LitElement) {

    static get properties() {
        return {
            hero: { type: Object },
            limit: { type: Number}
        };
    }

    constructor() {
        super()
        window.scrollTo(0,0) 
        this.limit = 30
    }

    stateChanged(state) {
        this.hero = state.hero;  
      }

    render() {
        return html`
        <app-header></app-header>
        
        <div class="hero-detail">
            <div class="hero-data">
                <div class="hero-data-heading">
                    <img class="hero-thumbnail" src="${this.hero.thumbnail.path}/landscape_xlarge.${this.hero.thumbnail.extension}" >
                    <div class="main-data">
                        <h2>${this.hero.name}</h2>
                        <p>${this.hero.description}</p>
                    </div>
                </div>
                <div class="secondary-data">
                    <h3>Comics</h3>
                    <hero-resources limit="${this.limit}" resource="comics"></hero-resources>
                    <h3>Series</h3>
                    <hero-resources limit="${this.limit}" resource="series"></hero-resources>
                    <h3>Stories</h3>
                    <hero-resources limit="${this.limit}" resource="stories"></hero-resources>
                </div>
            </div>
        </div>
        `; 
    }

    static styles = [
        css`
            :host {
                display: block;
            }

            .hero-detail {
                padding-top: 27px;
            }

            .hero-thumbnail {
                width: 100%;
            }

            .hero-data {
                color: #333333;
            }

            .main-data {
                background-color: rgb(17, 17, 17);
                color: rgb(243, 243, 243);
                padding: 25px 16px;
                margin-top: -7px;
                border-top: 3px solid rgb(237, 29, 36);
            }

            .main-data p {
                font-size: 15px;
                line-height: 20px;
            }

            .secondary-data {
                padding: 10px 16px;
                max-width: 1600px;
                margin: 0 auto;
            }

            .secondary-data h3 {
                padding-left: 7px;
                position: relative
            }

            .secondary-data h3::after {
                display: block;
                content: "";
                height: 1px;
                background: #cccccc;
                position: absolute;
                bottom: -5px;
                left: 7px;
                right: 14px;
            }

            @media (min-width: 1024px) {
                .hero-data-heading {
                    display: flex;
                }

                .main-data {
                    background-color: rgb(17, 17, 17);
                    color: rgb(243, 243, 243);
                    padding: 35px 51px;
                    width: 99vw;
                    border-top: none;
                }

                .main-data h2 {
                    font-size: 45px;
                }

                .main-data p {
                    font-size:20px;
                    line-height: 25px;
                }

                .secondary-data h3 {
                    font-size: 25px;
                    padding-left: 24px;
                }

                .secondary-data h3::after {
                    left: 20px;
                }
            }
        `
    ];
}
customElements.define('char-detail', CharDetail);
