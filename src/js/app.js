
/* VARIABLES */

var vr_config = {
    player_speed: 0.05,
    player_main_hand: "left",
}


/* FUNCTIONS */

// qSelect (select element(s) by querySelector) 
function qSelect(s = []) {
    let prepared = [];
    s.forEach(el => {
        prepared.push(document.querySelectorAll(el));
    });
    return prepared;
}

/* AFRAME COMPONENTS */

// AUTOSCALE (FOR MODELS)

AFRAME.registerComponent('autoscale', {
    schema: {type: 'number', default: 1},
    init: function () {
      this.scale();
      this.el.addEventListener('object3dset', () => this.scale());
    },
    scale: function () {
      const el = this.el;
      const span = this.data;
      const mesh = el.getObject3D('mesh');
  
      if (!mesh) return;
  
      // Compute bounds.
      const bbox = new THREE.Box3().setFromObject(mesh);
  
      // Normalize scale.
      const scale = span / bbox.getSize().length();
      mesh.scale.set(scale, scale, scale);
  
      // Recenter.
    //   const offset = bbox.getCenter().multiplyScalar(scale);
    //   mesh.position.sub(offset);
    }
});

// AFRAME -CONTROLLER EVENTS

AFRAME.registerComponent('vr-controller', {

    init: function () {
        var el = this.el;

        // ADD OCULUS TOUCH EVENTS
        // Some of this functions also links to general functions

        el.addEventListener('triggerdown', this.oculusTouch_triggerdown);
        el.addEventListener('triggerup', this.oculusTouch_triggerup);
        el.addEventListener('triggertouchstart', this.oculusTouch_triggertouchstart);
        el.addEventListener('triggertouchend', this.oculusTouch_triggertouchend);
        el.addEventListener('triggerchanged', this.oculusTouch_triggerchanged);

        el.addEventListener('thumbstickdown', this.oculusTouch_thumbstickdown);
        el.addEventListener('thumbstickup', this.oculusTouch_thumbstickup);
        el.addEventListener('thumbsticktouchstart', this.oculusTouch_thumbsticktouchstart);
        el.addEventListener('thumbsticktouchend', this.oculusTouch_thumbsticktouchend);
        el.addEventListener('thumbstickchanged', this.oculusTouch_thumbstickchanged);
        el.addEventListener('thumbstickmoved', this.oculusTouch_thumbstickmoved);

        el.addEventListener('gripdown', this.oculusTouch_gripdown);
        el.addEventListener('gripup', this.oculusTouch_gripup);
        el.addEventListener('griptouchstart', this.oculusTouch_griptouchstart);
        el.addEventListener('griptouchend', this.oculusTouch_griptouchend);
        el.addEventListener('gripchanged', this.oculusTouch_gripchanged);

        el.addEventListener('abuttondown', this.oculusTouch_abuttondown);
        el.addEventListener('abuttonup', this.oculusTouch_abuttonup);
        el.addEventListener('abuttontouchstart', this.oculusTouch_abuttontouchstart);
        el.addEventListener('abuttontouchend', this.oculusTouch_abuttontouchend);
        el.addEventListener('abuttonchanged', this.oculusTouch_abuttonchanged);

        el.addEventListener('bbuttondown', this.oculusTouch_bbuttondown);
        el.addEventListener('bbuttonup', this.oculusTouch_bbuttonup);
        el.addEventListener('bbuttontouchstart', this.oculusTouch_bbuttontouchstart);
        el.addEventListener('bbuttontouchend', this.oculusTouch_bbuttontouchend);
        el.addEventListener('bbuttonchanged', this.oculusTouch_bbuttonchanged);
        
        el.addEventListener('xbuttondown', this.oculusTouch_xbuttondown);
        el.addEventListener('xbuttonup', this.oculusTouch_xbuttonup);
        el.addEventListener('xbuttontouchstart', this.oculusTouch_xbuttontouchstart);
        el.addEventListener('xbuttontouchend', this.oculusTouch_xbuttontouchend);
        el.addEventListener('xbuttonchanged', this.oculusTouch_xbuttonchanged);

        el.addEventListener('ybuttondown', this.oculusTouch_ybuttonchanged);
        el.addEventListener('ybuttonup', this.oculusTouch_ybuttonup);
        el.addEventListener('ybuttontouchstart', this.oculusTouch_ybuttontouchstart);
        el.addEventListener('ybuttontouchend', this.oculusTouch_ybuttontouchend);
        el.addEventListener('ybuttonchanged', this.oculusTouch_ybuttonchanged);

        el.addEventListener('surfacedown', this.oculusTouch_surfacedown);
        el.addEventListener('surfaceup', this.oculusTouch_surfaceup);
        el.addEventListener('surfacetouchstart', this.oculusTouch_surfacetouchstart);
        el.addEventListener('surfacetouchend', this.oculusTouch_surfacetouchend);
        el.addEventListener('surfacechanged', this.oculusTouch_surfacechanged);


        // ADD RAYCASTER EVENTS
        // Some of this functions also links to general functions

        el.addEventListener("raycaster-intersected", this.raycaster_intersected);
        el.addEventListener("raycaster-intersected-cleared", this.raycaster_intersected_cleared);
        el.addEventListener("raycaster-intersection", this.raycaster_intersection);
        el.addEventListener("raycaster-intersection-cleared", this.raycaster_intersection_cleared);
    },

    // EVENTS - GENERAL
    // They have not defined in "init"

    onclick: e => {
        
    },
    clicked: e => {
        
    },

    // EVENTS - RAYCASTER

    raycaster_intersected: e => {},
    raycaster_intersected_cleared: e => {},
    raycaster_intersection: e => {},
    raycaster_intersection_cleared: e => {},

    // EVENTS - OCULUS TOUCH
    // Some of this functions also links to general functions

    oculusTouch_triggerdown: e => {
        
    },
    oculusTouch_triggerup: e => {},
    oculusTouch_triggertouchstart: e => {},
    oculusTouch_triggertouchend: e => {},
    oculusTouch_triggerchanged: e => {},

    oculusTouch_thumbstickdown: e => {},
    oculusTouch_thumbstickup: e => {
        
    },
    oculusTouch_thumbsticktouchstart: e => {},
    oculusTouch_thumbsticktouchend: e => {},
    oculusTouch_thumbstickchanged: e => {},
    oculusTouch_thumbstickmoved: e => {
        
    },

    oculusTouch_gripdown: e => {},
    oculusTouch_gripup: e => {},
    oculusTouch_griptouchstart: e => {},
    oculusTouch_griptouchend: e => {},
    oculusTouch_gripchanged: e => {},

    oculusTouch_abuttondown: e => {},
    oculusTouch_abuttonup: e => {},
    oculusTouch_abuttontouchstart: e => {},
    oculusTouch_abuttontouchend: e => {},
    oculusTouch_abuttonchanged: e => {},

    oculusTouch_bbuttondown: e => {},
    oculusTouch_bbuttonup: e => {},
    oculusTouch_bbuttontouchstart: e => {},
    oculusTouch_bbuttontouchend: e => {},
    oculusTouch_bbuttonchanged: e => {},

    oculusTouch_xbuttondown: e => {

    },
    oculusTouch_xbuttonup: e => {

    },
    oculusTouch_xbuttontouchstart: e => {},
    oculusTouch_xbuttontouchend: e => {},
    oculusTouch_xbuttonchanged: e => {},

    oculusTouch_ybuttondown: e => {},
    oculusTouch_ybuttonup: e => {},
    oculusTouch_ybuttontouchstart: e => {},
    oculusTouch_ybuttontouchend: e => {},
    oculusTouch_ybuttonchanged: e => {},

    oculusTouch_surfacedown: e => {},
    oculusTouch_surfaceup: e => {},
    oculusTouch_surfacetouchstart: e => {},
    oculusTouch_surfacetouchend: e => {},
    oculusTouch_surfacechanged: e => {},
});