function updateTimeLeft() {
   const now = new Date();
   const hour = now.getHours();

   // Check sleeping time: 11 PM (23) to 7 AM (07)
   // CHARGING MODE TIME WINDOW
   if (hour >= 23 || hour < 7) {
      document.getElementById("battery").style.display = "block";
      // Charging message with animation
      let timeLeftEl = document.getElementById("time-left");
      timeLeftEl.innerText = "🔋 Charging… Please Rest ⚡";
      timeLeftEl.classList.add("charging-text");

      document.getElementById("percent").innerText =
         "Energy Recharging For Tomorrow";

      // Charging bar breathing animation
      const progressBar = document.getElementById("progress-bar");
      progressBar.style.width = "70%";
      progressBar.style.background = "linear-gradient(90deg, #00eaff, #0072ff)";
      progressBar.classList.add("charging-bar");

      // Background becomes futuristic electric blue
      document.body.style.background =
         "linear-gradient(135deg, #0f2027, #203a43, #2c5364)";

      return;
   }



   // NORMAL LOGIC (when day is active)
   document.getElementById("battery").style.display = "none";
   const endOfDay = new Date();
   endOfDay.setHours(23, 59, 59, 999);

   if (endOfDay <= now) {
      endOfDay.setDate(endOfDay.getDate() + 1);
   }

   const diffMs = endOfDay - now;

   const hours = Math.floor(diffMs / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
   const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
   const seconds = Math.floor((diffMs % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");

   document.getElementById("time-left").innerText =
      `${hours}h : ${minutes}m : ${seconds}s left today`;

   updateProgressBar();
   updateGradient();
}

function updateProgressBar() {
   const now = new Date();
   // update start of the day
   const startOfDay = new Date();
   startOfDay.setHours(7, 0, 0, 0);

   // update end of the day
   const endOfDay = new Date();
   endOfDay.setHours(23, 59, 59, 999);

   const totalDayMs = endOfDay - startOfDay;
   const elapsedMs = now - startOfDay;

   const percent = (elapsedMs / totalDayMs) * 100;

   const progressBar = document.getElementById("progress-bar");
   progressBar.style.width = percent + "%";
   document.getElementById("percent").innerText ="Day Progress " + Math.floor(percent) + "% - Make The Hours Count";

   // Dynamically adjust gradient position based on progress
   if (percent < 50) {
      // Only show the first color (green)
      progressBar.style.background = "#3fb578";
   } else if (percent < 75) {
      // Blend between green and yellow
      progressBar.style.background = "linear-gradient(90deg, #3fb578, #f9d423)";
   } else {
      // Full gradient visible (green → yellow → red)
      progressBar.style.background =
         "linear-gradient(90deg, #3fb578, #f9d423, #ff4e50)";
   }
}

function updateGradient() {
   const hour = new Date().getHours();
   let gradient = "";

   if (hour >= 5 && hour < 12) {
      // gradient = "linear-gradient(135deg, #FFDEE9, #B5FFFC)"; // morning
      gradient = "linear-gradient(135deg, #758214ff, #588b89ff)"; // morning
   } else if (hour >= 12 && hour < 16) {
      gradient = "linear-gradient(135deg, #89f7fe, #66a6ff)"; // noon
   } else if (hour >= 16 && hour < 19) {
      gradient = "linear-gradient(135deg, #fbc2eb, #a6c1ee)"; // evening
   } else {
      gradient = "linear-gradient(135deg, #141E30, #243B55)"; // night
   }

   document.body.style.background = gradient;
}

updateTimeLeft();
setInterval(updateTimeLeft, 1000);
