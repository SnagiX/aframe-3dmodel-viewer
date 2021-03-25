
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

    onclick: function (e) {
        
    },
    clicked: function (e) {
        
    },

    // EVENTS - RAYCASTER

    raycaster_intersected: function (e) {console.log(e);},
    raycaster_intersected_cleared: function (e) {console.log(e);},
    raycaster_intersection: function (e) {console.log(e);},
    raycaster_intersection_cleared: function (e) {console.log(e);},

    // EVENTS - OCULUS TOUCH
    // Some of this functions also links to general functions

    oculusTouch_triggerdown: function (e) {
        console.log(e);
    },
    oculusTouch_triggerup: function (e) {console.log(e);},
    oculusTouch_triggertouchstart: function (e) {console.log(e);},
    oculusTouch_triggertouchend: function (e) {console.log(e);},
    oculusTouch_triggerchanged: function (e) {console.log(e);},

    oculusTouch_thumbstickdown: function (e) {console.log(e);},
    oculusTouch_thumbstickup: function (e) {
        console.log(e);
    },
    oculusTouch_thumbsticktouchstart: function (e) {console.log(e);},
    oculusTouch_thumbsticktouchend: function (e) {console.log(e);},
    oculusTouch_thumbstickchanged: function (e) {console.log(e);},
    oculusTouch_thumbstickmoved: function (e) {
        
        let cam = qSelect(["#vr-camera-wrapper"])[0][0];

        let headset_rotation = document.querySelector("#vr-camera").getAttribute("rotation");

        let pos_coords = cam.getAttribute("position");

        // console.log(document.querySelector("#vr-camera").getAttribute("rotation"));

        let new_coords = {
            x: e.detail.x * vr_config.player_speed + pos_coords.x,
            y: pos_coords.y,
            z: e.detail.y * vr_config.player_speed + pos_coords.z
        }

        cam.setAttribute("position", `${new_coords.x} ${new_coords.y} ${new_coords.z}`);
    },

    oculusTouch_gripdown: function (e) {console.log(e);},
    oculusTouch_gripup: function (e) {console.log(e);},
    oculusTouch_griptouchstart: function (e) {console.log(e);},
    oculusTouch_griptouchend: function (e) {console.log(e);},
    oculusTouch_gripchanged: function (e) {console.log(e);},

    oculusTouch_abuttondown: function (e) {console.log(e);},
    oculusTouch_abuttonup: function (e) {console.log(e);},
    oculusTouch_abuttontouchstart: function (e) {console.log(e);},
    oculusTouch_abuttontouchend: function (e) {console.log(e);},
    oculusTouch_abuttonchanged: function (e) {console.log(e);},

    oculusTouch_bbuttondown: function (e) {console.log(e);},
    oculusTouch_bbuttonup: function (e) {console.log(e);},
    oculusTouch_bbuttontouchstart: function (e) {console.log(e);},
    oculusTouch_bbuttontouchend: function (e) {console.log(e);},
    oculusTouch_bbuttonchanged: function (e) {console.log(e);},

    oculusTouch_xbuttondown: function (e) {console.log(e);},
    oculusTouch_xbuttonup: function (e) {console.log(e);},
    oculusTouch_xbuttontouchstart: function (e) {console.log(e);},
    oculusTouch_xbuttontouchend: function (e) {console.log(e);},
    oculusTouch_xbuttonchanged: function (e) {console.log(e);},

    oculusTouch_ybuttondown: function (e) {console.log(e);},
    oculusTouch_ybuttonup: function (e) {console.log(e);},
    oculusTouch_ybuttontouchstart: function (e) {console.log(e);},
    oculusTouch_ybuttontouchend: function (e) {console.log(e);},
    oculusTouch_ybuttonchanged: function (e) {console.log(e);},

    oculusTouch_surfacedown: function (e) {console.log(e);},
    oculusTouch_surfaceup: function (e) {console.log(e);},
    oculusTouch_surfacetouchstart: function (e) {console.log(e);},
    oculusTouch_surfacetouchend: function (e) {console.log(e);},
    oculusTouch_surfacechanged: function (e) {console.log(e);},
});