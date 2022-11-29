import { LitElement, html, css } from 'lit';
import {map} from 'lit/directives/map.js';
import { connect } from 'pwa-helpers';
import { store } from '../store/store';
import { hero } from '../store/actions';
import { Router } from '@vaadin/router';

import '../components/get-data';
import '../components/data-paginator';
import '../components/header';


export class CharList extends connect(store)(LitElement) {
    
   static get properties() {
        return {
            name: { type: Object },
            publicKey: {type: String},
            privateKey: {type: String},
            characters: { type: Array},
            limit: {type: Number},
            hash: {type: String},
            baseUrl: {type: String},
            searchValue: { type: String }
        };
    }
    constructor() {
        super()
        this.characters = [],
        this.limit = 50,
        this.baseUrl = "http://gateway.marvel.com/v1/public/characters?"
        this.getData()
    }


    stateChanged(state) {
       this.hero = state.hero;
       window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      }); 
    }

    getData() {
        this.addEventListener('ApiData', (e) => {
            this.characters = e.detail.data
        })
    }

    openDetail(character) {
        let path = `/detail:${character.id}`  
        store.dispatch(hero(character));
        Router.go(path)
    }

    
    render() {
        return html`
        <app-header ></app-header>
        <get-data baseUrl="${this.baseUrl}"  limit="${this.limit}"></get-data>
        
        <div class="main-list">
        
            <div class="cards">
                ${map(this.characters, (character) => html`
                <div class="card" @click=${() => this.openDetail(character)} href="/detail:${character.id}">
                    <img class="character-portrait" src="${character.thumbnail.path}/landscape_incredible.${character.thumbnail.extension}" alt="">
                    <div class="character-data" >
                    <h3>${character.name}</h3>
                    </div>
                </div>`)}
            </div>
            <data-paginator limit="${this.limit}" total="${this.characters.total}"></data-paginator>
        </div>
        `;
    }

    
        
    static styles = [
        css `
            :host {
            margin: 0 auto;
            padding: 2rem;
        }
        .search-container {
            position: fixed;
            left: 0px;
            right: 0px;
            top: 55px;
        }
        .main-list {
            max-width: 1600px;
            margin: 0 auto;
        }
        .cards {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            padding-top: 50px;
            min-width: 330px;
        }

        .card {
            width: 46%;
            color: rgb(243, 243, 243);
            overflow: hidden;
            background-color: rgb(17, 17, 17);
            box-shadow: rgb(0 0 0 / 30%) 0px 4px 8px;
            margin: 2%;
            height: 206px;
            display: flex;
            flex-direction: column;
            border-radius: 3px;
        }


        .character-portrait {
            width: 100%;
            object-fit: cover;
            flex-grow: 1;
        }

        .character-data {
            padding: 10px 16px;
            display: flex;
            align-items: center;
            flex-grow:1;
            border-top: 3px solid rgb(237, 29, 36);
        }

        .character-data h3 {
            margin: 0;
            font-size: 17px;
        }

        @media (min-width: 1024px) {
            .cards {
                flex-direction: row;
                flex-wrap: wrap;
            }

            .card {
                width: 18%;
                min-width: 18%;
                margin: 1%;
                height: 250px;
            }
        }

        `
    ];

}

customElements.define('char-list', CharList);
