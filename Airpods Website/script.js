//Navbar
// DOM Elements
const registerBtn = document.getElementById('registerBtn');
const authModal = document.getElementById('authModal');
const closeAuthModal = document.getElementById('closeAuthModal');
const signinForm = document.getElementById('signinForm');
const signupForm = document.getElementById('signupForm');
const showSignup = document.getElementById('showSignup');
const showSignin = document.getElementById('showSignin');
const signinSubmitBtn = document.getElementById('signinSubmitBtn');
const signupSubmitBtn = document.getElementById('signupSubmitBtn');
const userActions = document.getElementById('userActions');
const userProfileBtn = document.getElementById('userProfileBtn');
const notificationBtn = document.getElementById('notificationBtn');
const userDropdownModal = document.getElementById('userDropdownModal');
const notificationsModal = document.getElementById('notificationsModal');
const logoutBtn = document.getElementById('logoutBtn');

// State management
let isUserLoggedIn = false;

// Open authentication modal
registerBtn.addEventListener('click', () => {
    authModal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
});

// Close authentication modal
closeAuthModal.addEventListener('click', () => {
    authModal.classList.remove('modal-active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.classList.remove('modal-active');
        document.body.style.overflow = 'auto';
    }
});

// Switch to Sign Up form
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signinForm.style.display = 'none';
    signupForm.style.display = 'block';
});

// Switch to Sign In form
showSignin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    signinForm.style.display = 'block';
});

// Handle Sign In submission
signinForm.querySelector('.auth-input-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const email = signinForm.querySelector('input[type="email"]').value;
    const password = signinForm.querySelector('input[type="password"]').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    // Simulate successful login
    console.log('Signing in with:', { email, password });
    
    // Call login function
    loginUser();
});

// Handle Sign Up submission
signupForm.querySelector('.auth-input-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const inputs = signupForm.querySelectorAll('input');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;
    
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }
    
    // Simulate successful signup
    console.log('Signing up with:', { name, email, password });
    
    // Call login function after signup
    loginUser();
});

// Login user function
function loginUser() {
    isUserLoggedIn = true;
    
    // Hide register button and show user actions
    registerBtn.style.display = 'none';
    userActions.style.display = 'flex';
    
    // Close modal
    authModal.classList.remove('modal-active');
    document.body.style.overflow = 'auto';
    
    // Reset forms
    signinForm.querySelector('.auth-input-form').reset();
    signupForm.querySelector('.auth-input-form').reset();
    signinForm.style.display = 'block';
    signupForm.style.display = 'none';
    
    // Show success message
    showNotificationToast('Successfully logged in!');
}

// Logout user function
function logoutUser() {
    isUserLoggedIn = false;
    
    // Show register button and hide user actions
    registerBtn.style.display = 'block';
    userActions.style.display = 'none';
    
    // Close dropdown
    userDropdownModal.classList.remove('dropdown-active');
    
    // Show logout message
    showNotificationToast('Successfully logged out!');
}

// Handle logout
logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

// Toggle user profile dropdown
userProfileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close notifications modal if open
    notificationsModal.classList.remove('dropdown-active');
    
    // Toggle user dropdown
    userDropdownModal.classList.toggle('dropdown-active');
});

// Toggle notifications dropdown
notificationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close user dropdown if open
    userDropdownModal.classList.remove('dropdown-active');
    
    // Toggle notifications dropdown
    notificationsModal.classList.toggle('dropdown-active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!userDropdownModal.contains(e.target) && !userProfileBtn.contains(e.target)) {
        userDropdownModal.classList.remove('dropdown-active');
    }
    
    if (!notificationsModal.contains(e.target) && !notificationBtn.contains(e.target)) {
        notificationsModal.classList.remove('dropdown-active');
    }
});

// Prevent dropdown from closing when clicking inside
userDropdownModal.addEventListener('click', (e) => {
    if (e.target.id !== 'logoutBtn' && !e.target.closest('#logoutBtn')) {
        e.stopPropagation();
    }
});

notificationsModal.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Handle notification interactions
const notificationItems = document.querySelectorAll('.notification-list-item');
notificationItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.remove('unread-notification');
        console.log('Notification clicked');
    });
});

// Mark all notifications as read
const markAllReadBtn = document.querySelector('.mark-all-read-btn');
markAllReadBtn.addEventListener('click', () => {
    const unreadNotifications = document.querySelectorAll('.unread-notification');
    unreadNotifications.forEach(notification => {
        notification.classList.remove('unread-notification');
    });
    
    // Update notification badge
    const notificationBadge = document.querySelector('.notification-badge');
    notificationBadge.textContent = '0';
    notificationBadge.style.display = 'none';
    
    console.log('All notifications marked as read');
});

// Handle dropdown menu item clicks
const dropdownItems = document.querySelectorAll('.dropdown-menu-item');
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (e.currentTarget.id !== 'logoutBtn') {
            e.preventDefault();
            const itemText = e.currentTarget.textContent.trim();
            console.log('Navigating to:', itemText);
            
            // Close dropdown after navigation
            userDropdownModal.classList.remove('dropdown-active');
        }
    });
});

// Show notification toast (helper function)
function showNotificationToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'notification-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        font-size: 14px;
        font-weight: 600;
        animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Append toast to body
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.remove();
        style.remove();
    }, 3000);
}

// Handle search functionality
const searchInput = document.querySelector('.search-input-field');
const searchBtn = document.querySelector('.search-submit-btn');

searchBtn.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
        console.log('Searching for:', searchQuery);
        // Add your search logic here
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            console.log('Searching for:', searchQuery);
            // Add your search logic here
        }
    }
});

// Handle wishlist button click
const wishlistBtn = document.querySelector('.wishlist-btn');
wishlistBtn.addEventListener('click', () => {
    console.log('Wishlist clicked');
    // Add your wishlist logic here
});

// Handle cart button click
const cartBtn = document.querySelector('.cart-btn');
cartBtn.addEventListener('click', () => {
    console.log('Cart clicked');
    // Add your cart logic here
});

// Keyboard accessibility - ESC key to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close auth modal
        if (authModal.classList.contains('modal-active')) {
            authModal.classList.remove('modal-active');
            document.body.style.overflow = 'auto';
        }
        
        // Close dropdowns
        userDropdownModal.classList.remove('dropdown-active');
        notificationsModal.classList.remove('dropdown-active');
    }
});

// Initialize - Check if user is logged in (you can load from localStorage)
window.addEventListener('DOMContentLoaded', () => {
    // Check localStorage for login state
    const savedLoginState = localStorage.getItem('isUserLoggedIn');
    
    if (savedLoginState === 'true') {
        isUserLoggedIn = true;
        registerBtn.style.display = 'none';
        userActions.style.display = 'flex';
    } else {
        isUserLoggedIn = false;
        registerBtn.style.display = 'block';
        userActions.style.display = 'none';
    }
});

// Save login state to localStorage
function saveLoginState() {
    localStorage.setItem('isUserLoggedIn', isUserLoggedIn.toString());
}

// Update login/logout functions to save state
const originalLoginUser = loginUser;
loginUser = function() {
    originalLoginUser();
    isUserLoggedIn = true;
    saveLoginState();
};

const originalLogoutUser = logoutUser;
logoutUser = function() {
    originalLogoutUser();
    isUserLoggedIn = false;
    saveLoginState();
};

// Handle active navigation link
const navLinks = document.querySelectorAll('.nav-item');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active-link'));
        
        // Add active class to clicked link
        e.target.classList.add('active-link');
    });
});

console.log('Navbar initialized successfully');

//Index hero Banner
   // Add smooth scroll behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add click animations to buttons
        document.querySelectorAll('.primary-cta').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'translateY(-2px)';
                }, 100);
            });
        });

        //Faq
            function toggleFAQ(element) {
            const answer = element.nextElementSibling;
            const indicator = element.querySelector('.toggle-indicator');
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                indicator.textContent = '▼';
            } else {
                answer.style.display = 'block';
                indicator.textContent = '▲';
            }
        }

        // Initialize FAQ items as collapsed
        document.addEventListener('DOMContentLoaded', function() {
            const answers = document.querySelectorAll('.faq-answer');
            answers.forEach(answer => {
                answer.style.display = 'block';
            });
        });

//Contact
 const contactForm = document.getElementById('contactForm');
        const successPopup = document.getElementById('successPopup');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show popup
            successPopup.classList.add('active');
            
            // Reset form
            contactForm.reset();
        });

        function closePopup() {
            successPopup.classList.remove('active');
        }

        // Close popup when clicking outside
        successPopup.addEventListener('click', function(e) {
            if (e.target === successPopup) {
                closePopup();
            }
        });

        //Like Section
          function showToast(message) {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        function addToCart(productName) {
            showToast(`${productName} added to cart!`);
        }

        function copyLink() {
            const linkInput = document.getElementById('wishlistLink');
            linkInput.select();
            linkInput.setSelectionRange(0, 99999);
            
            navigator.clipboard.writeText(linkInput.value).then(() => {
                showToast('Link copied to clipboard!');
            }).catch(() => {
                document.execCommand('copy');
                showToast('Link copied to clipboard!');
            });
        }

        function clearWishlist() {
            if (confirm('Are you sure you want to clear your wishlist?')) {
                showToast('Wishlist cleared!');
            }
        }

        function addAllToCart() {
            showToast('All items added to cart!');
        }

        //Cart
         const ITEM_PRICE = 29;
        let quantity = 1;
        let discountAmount = 0;

        function updateCart() {
            // Update quantity display
            document.getElementById('qtyInput').value = quantity;
            document.getElementById('itemCount').textContent = quantity;

            // Calculate prices
            const subtotal = ITEM_PRICE * quantity;
            const shipping = 0;
            const taxes = 0;
            const total = subtotal + shipping + taxes - discountAmount;

            // Update price displays
            document.getElementById('itemPrice').textContent = `$${subtotal}`;
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('shipping').textContent = `$${shipping.toFixed(1)}`;
            document.getElementById('taxes').textContent = `$${taxes.toFixed(1)}`;
            document.getElementById('discount').textContent = `$${discountAmount.toFixed(0)}`;
            document.getElementById('totalPrice').textContent = `$${total}`;
        }

        function increaseQty() {
            quantity++;
            updateCart();
        }

        function decreaseQty() {
            if (quantity > 1) {
                quantity--;
                updateCart();
            }
        }

        function applyCoupon() {
            const couponInput = document.getElementById('couponInput');
            const couponCode = couponInput.value.trim().toUpperCase();

            // Example coupon codes
            if (couponCode === 'SAVE10') {
                discountAmount = 10;
                alert('Coupon applied! $10 discount added.');
            } else if (couponCode === 'SAVE20') {
                discountAmount = 20;
                alert('Coupon applied! $20 discount added.');
            } else if (couponCode === '') {
                alert('Please enter a coupon code.');
                return;
            } else {
                alert('Invalid coupon code.');
                return;
            }

            updateCart();
            couponInput.value = '';
        }

        function clearCart(event) {
            event.preventDefault();
            if (confirm('Are you sure you want to clear your shopping cart?')) {
                quantity = 1;
                discountAmount = 0;
                document.getElementById('couponInput').value = '';
                updateCart();
                alert('Shopping cart cleared!');
            }
        }

        function proceedCheckout() {
            alert('Proceeding to checkout...');
        }

        // Initialize cart
        updateCart();

        //Invoice
          function downloadInvoice() {
            alert('Invoice download started...');
            // In a real application, this would trigger a PDF download
        }

        function trackOrder() {
            alert('Redirecting to order tracking...');
            // In a real application, this would redirect to tracking page
        }
        //Payment
                // Predefined data object
        const predefinedData = {
            firstName: 'David',
            lastName: 'Johnson',
            country: 'India',
            streetAddress: '3/277 long street,padi',
            city: 'Chennai',
            state: 'Tamilnadu',
            zipcode: '627424',
            phoneNumber: '7867980688',
            emailId: 'David@gmail.com'
        };

        // Function to fill predefined data on double-click
        function fillPredefinedData(fieldId) {
            const inputField = document.getElementById(fieldId);
            
            if (predefinedData[fieldId]) {
                inputField.value = predefinedData[fieldId];
                
                // Add a visual feedback
                inputField.style.borderColor = '#10b981';
                setTimeout(() => {
                    inputField.style.borderColor = '#e2e8f0';
                }, 500);
            }
        }

        // Function to process payment
        function processPayment() {
            // Validate all required fields
            const requiredFields = ['firstName', 'lastName', 'country', 'streetAddress', 'city', 'state', 'zipcode', 'phoneNumber', 'emailId'];
            let allFieldsFilled = true;

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (!field.value.trim()) {
                    allFieldsFilled = false;
                    field.style.borderColor = '#ef4444';
                } else {
                    field.style.borderColor = '#e2e8f0';
                }
            });

            if (allFieldsFilled) {
                alert('Processing payment... Order confirmed!');
            } else {
                alert('Please fill in all required fields. You can double-click on any field to autofill with sample data.');
            }
        }

        // Add visual hint on hover
        document.querySelectorAll('.text-input-field').forEach(input => {
            input.addEventListener('mouseenter', function() {
                if (!this.value) {
                    this.placeholder = 'Double-click to autofill';
                }
            });
        });
