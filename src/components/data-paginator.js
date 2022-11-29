import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers';
import { store } from '../store/store';
import { offset } from '../store/actions';
import chevron from "../assets/chevron.svg";



export class DataPaginator extends connect(store)(LitElement) {

    static get properties() {
        return {
            offset: {type: Number},
            limit: { type: Number},
            totla: { type: Number}
        };
    }

    stateChanged(state) {
        this.offset = state.offset  
      }

    render() {
        return html`
        <div class="buttons">
            ${this.paginatorPrev()}
            ${this.paginatorNext()}
        </div>
        `
    }

   prevPage() {
    store.dispatch(offset(this.offset-this.limit))
   }
   nextPage() {
    store.dispatch(offset(this.offset+this.limit))
   }

    paginatorPrev() {
        let isDisabled = false 
        this.offset == 0 ? isDisabled = true : isDisabled = false;
        return html `
            <button ?disabled=${isDisabled} class="prev" @click=${this.prevPage} part="button">
               <img src="${chevron}" alt="Prev">
            </button>
            `
    }
    
    paginatorNext() {
        let isDisabled = false
        this.offset >= Math.round(this.total) ? isDisabled = true :  isDisabled = false 
        return html `
            <button ?disabled=${isDisabled} class="next" @click=${this.nextPage} part="button">
                <img src="${chevron}" alt="Next">
            </button>
            `
    }
    static styles = [
        css `
        .buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 28px;
            background: white;
            position: fixed;
            bottom: 0px;
            left: 0px;
            right: 0px;
            padding: 17px 29px 8px;
            z-index: 1;
            box-shadow: rgb(0 0 0 / 20%) 0px -3px 6px
        }
        .buttons button {
            border: none;
            background: transparent;
        }

        .buttons .prev {
            transform: rotateY(180deg);
        }

        .buttons .prev[disabled], .buttons .next[disabled] {
            opacity:0.3
        }
        `
    ];
}
customElements.define('data-paginator', DataPaginator);