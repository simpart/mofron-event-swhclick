/**
 * @file mofron-event-swhclick/index.js
 * @brief switch click event for mofron
 * @author simpart
 */
const mf = require('mofron');
const Click = require('mofron-event-click');

mf.event.SwhClick = class extends Click {
    
    constructor (po, p2) {
        try {
            super();
            this.name('SwhClick');
            this.prmMap(['disableTgt', 'enableTgt']);
            this.prmOpt(po, p2);
            
            let hdl = (tgt, vs) => {
                try {
                    let dis_tgt = vs.disableTgt();
                    let en_tgt  = vs.enableTgt();
                    let cb = () => {
                        try { en_tgt.visible(true); } catch (e) {
                            console.error(e.stack);
                            throw e;
                        }
                    }
                    dis_tgt.visible(false, cb);
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            };
            this.handler(hdl, this);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disableTgt (prm) {
        try {
            let ret = this.target('disable', prm);
            return ('string' === typeof ret) ? mf.objkey[ret] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enableTgt (prm) {
        try {
            let ret = this.target('enable', prm);
            return ('string' === typeof ret) ? mf.objkey[ret] : ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    target (tp, prm) {
        try {
            if (('enable' !== tp) && ('disable' !== tp)) {
                throw new Error('invalid parameter');
            }
            if (undefined === prm) {
                /* getter */
                if (undefined === this.m_target[tp]) {
                     throw new Error('could not find target');
                }
                return this.m_target[tp];
            }
            /* setter */
            if (undefined === this.m_target) {
                this.m_target = {};
            }
            if ( ('string' !== typeof prm) && (true !== mf.func.isComp(prm)) ) {
                throw new Error('invalid parameter');
            }
            this.m_target[tp] = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.event.SwhClick;
/* end of file */
