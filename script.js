document.addEventListener('DOMContentLoaded', () => {
    const dot = document.getElementById('dot');
    const timeline = document.getElementById('timeline');
    const container = document.getElementById('animation-container');
    const milestones = document.querySelectorAll('.milestone');

    const duration = 10000; // Animation duration in milliseconds (10 seconds)
    let startTime = null;

    // Calculate start and end positions based on container padding/margins for the timeline
    const timelineStartMargin = 5; // %
    const timelineEndMargin = 5; // %
    const dotWidthPercent = (dot.offsetWidth / container.offsetWidth) * 100;

    // Adjust positions slightly to center the dot visually on start/end points
    const startPositionPercent = timelineStartMargin;
    const endPositionPercent = 100 - timelineEndMargin;

    // Set initial milestone positions based on their data-position
    milestones.forEach(milestone => {
        const position = milestone.getAttribute('data-position');
        milestone.style.left = `${position}%`;
    });

    function animateDot(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }

        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Ensure progress doesn't exceed 1

        // Calculate the current position for the *center* of the dot
        const currentLeftPercent = startPositionPercent + (endPositionPercent - startPositionPercent) * progress;

        // Update dot's visual position (adjusting for its own width to center it)
        dot.style.left = `calc(${currentLeftPercent}% - ${dot.offsetWidth / 2}px)`;

        // Check milestones
        milestones.forEach(milestone => {
            const milestonePosition = parseFloat(milestone.getAttribute('data-position'));
            // Activate milestone slightly before the dot center reaches it for better visual timing
            if (currentLeftPercent >= milestonePosition - 1) { // Check if dot's leading edge is near/past
                 milestone.classList.add('active');
            }
            // Optional: Deactivate if needed for replay logic (not implemented here)
            // else {
            //     milestone.classList.remove('active');
            // }
        });


        // Continue animation if not finished
        if (progress < 1) {
            requestAnimationFrame(animateDot);
        } else {
            console.log("Animation complete!");
            // Optionally add a replay button or other actions here
        }
    }

    // Start the animation
    requestAnimationFrame(animateDot);
});