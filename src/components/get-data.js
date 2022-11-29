import { LitElement } from 'lit';
import {Md5} from 'ts-md5';
import { connect } from 'pwa-helpers';
import { store } from '../store/store';



export class getData extends connect(store)(LitElement) {

    static get properties() {
        return {
            path: { type: String },
            auth: { type: String },
            baseUrl: { type: String },
            limit: {type: Number},
            offset: {type: Number},
            publicKey: {type: String},
            privateKey: {type: String},
            hash: { type: String }
        };
    }
    constructor() {
        super()
        this.publicKey = "d3470449f460f26ccbafa3c43a0123bd",
        this.privateKey = "1eb6053b31ca156516099751c4ed83b0b28608e0",
        this.hash = Md5.hashStr(this.timeStamp() + this.privateKey + this.publicKey )
    }

    stateChanged(state) {
        this.offset = state.offset  
        this.getData()
      }

    _sendData(data) {
        this.dispatchEvent(new CustomEvent('ApiData', {
            detail: { data }, bubbles: true, composed: true
        }));
    }

    async getData() {
        try {
            const response = await fetch(this.endpointUrl())
            const toJson = await response.json()
            this._sendData(toJson.data.results)
        } catch(e) {
            console.log("Something wrong happens!", e)
        }
    }

    endpointUrl() {
        let baseUrl = this.baseUrl
        let auth = `&ts=${this.timeStamp()}&apikey=${this.publicKey}&hash=${this.hash}`
        let url = `${baseUrl}limit=${this.limit}&offset=${this.offset}${auth}`
        return url
    }

    timeStamp() {
        const ts = Date.now().toString
        return ts
    }

}
customElements.define('get-data', getData);
