class RangeSlider {
   constructor(handle, slideBar){
      this.handle = document.querySelector(handle);
      this.slideBar = document.querySelector(slideBar);
   };
   slide(cb){
      let mouseIsDown = false;
      const mouseIsUp = _ => mouseIsDown = false;

      const isMobile = e => e.type === 'touchstart' || e.type === 'touchmove';

      const drag = e => {
         let x;
         if(isMobile(e)) x = e.touches[0].clientX;
         else x = e.clientX;

         const range = this.slideBar.clientWidth - this.handle.offsetWidth
         const percentMoved = x => (100 * x) / range;

         let offset = (x - this.slideBar.offsetLeft) - (this.handle.offsetWidth / 2);
         if(offset < 1) offset = 0;
         if(offset > range) offset = range;
         
         const cbProps = {
            pixelRange: offset,
            percentMoved: Math.ceil(percentMoved(offset))
         };
         
         // move element
         if(mouseIsDown) {
            cb ? cb(cbProps) : false;
            this.handle.style.left = offset + 'px';
         }
      };

      const enableDrag = e => {
         mouseIsDown = true; // may not be necessary
         document.addEventListener('touchmove', drag) 
         document.addEventListener('mousemove', drag)
      };

      this.handle.addEventListener('mousedown', enableDrag);
      this.handle.addEventListener('touchstart', enableDrag);

      const stopListeners = _ => {
         this.handle.removeEventListener('mousedown', enableDrag);
         document.removeEventListener('mousemove', drag);
         document.removeEventListener('touchmove', drag);
         // re attach for continued use
         this.handle.addEventListener('mousedown', enableDrag);
         document.addEventListener('mousemove', drag);
         this.handle.addEventListener('touchend', enableDrag);
         this.handle.addEventListener('touchstart', enableDrag);
         document.addEventListener('touchmove', drag);
      };

      document.addEventListener('mouseup', () => {
         mouseIsUp();
         stopListeners(); 
      });

      document.addEventListener('touchend', () => {
         mouseIsUp();
         stopListeners(); 
      });
   };
}
