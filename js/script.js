document.addEventListener('DOMContentLoaded', () => {
    const cartBox = document.getElementById('cart-box');
    const items = document.querySelectorAll('.item');
    const checkoutBtn = document.querySelector('.checkout-btn');

    // Initialize GSAP
    gsap.set(cartBox, { transformPerspective: 1000 });

    // 3D Tilt Effect
    let bounds = cartBox.getBoundingClientRect();
    const calculateTilt = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const leftX = mouseX - bounds.x;
        const topY = mouseY - bounds.y;
        const center = {
            x: leftX - bounds.width / 2,
            y: topY - bounds.height / 2
        }
        const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

        gsap.to(cartBox, {
            duration: 0.5,
            rotationY: (center.x / bounds.width) * 20,
            rotationX: -(center.y / bounds.height) * 20,
            ease: 'power2.out',
        });
    }

    // Reset position when mouse leaves
    const resetTilt = () => {
        gsap.to(cartBox, {
            duration: 0.5,
            rotationY: 0,
            rotationX: 0,
            ease: 'power2.out',
        });
    }

    // Add hover animations for items
    items.forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                duration: 0.3,
                z: 30,
                scale: 1.02,
                ease: 'power2.out'
            });
        });

        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                duration: 0.3,
                z: 0,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });

    // Checkout button animation
    checkoutBtn.addEventListener('mouseenter', () => {
        gsap.to(checkoutBtn, {
            duration: 0.3,
            z: 50,
            scale: 1.05,
            boxShadow: '0 15px 30px rgba(46, 213, 115, 0.3)',
            ease: 'power2.out'
        });
    });

    checkoutBtn.addEventListener('mouseleave', () => {
        gsap.to(checkoutBtn, {
            duration: 0.3,
            z: 40,
            scale: 1,
            boxShadow: 'none',
            ease: 'power2.out'
        });
    });

    // Add floating animation to cart icon
    gsap.to('.cart-icon', {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });

    // Initialize event listeners
    document.addEventListener('mousemove', calculateTilt);
    document.addEventListener('mouseleave', resetTilt);

    // Update bounds on window resize
    window.addEventListener('resize', () => {
        bounds = cartBox.getBoundingClientRect();
    });

    // Add click animation for checkout button
    checkoutBtn.addEventListener('click', () => {
        gsap.to(cartBox, {
            duration: 0.2,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out'
        });
    });
});