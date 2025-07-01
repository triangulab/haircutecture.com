# Haircutecture Salon Website

A modern, responsive website for a professional hair salon with future POS and scheduling integration capabilities.

## Features

### Current Features
- **Responsive Design**: Mobile-first design that works on all devices
- **Announcement Banner**: Dismissible banner at the top for important messages
- **Interactive Navigation**: Smooth scrolling navigation with mobile hamburger menu
- **Service Showcase**: Professional service cards with pricing
- **Booking Form**: Complete appointment booking form with validation
- **Contact Information**: Easy-to-find contact details and business hours
- **Animated Elements**: Scroll-triggered animations for enhanced user experience
- **Logo Integration**: Uses the provided salon logo throughout the site

### Future Integration Ready
- **POS System Integration**: Placeholder classes ready for payment processing
- **Scheduling System**: Real-time appointment booking integration ready
- **Admin Panel**: Functions ready for content management

## File Structure

```
haircutecture.com/
├── index.html          # Main website structure
├── styles.css          # Complete styling and responsive design
├── script.js           # Interactive functionality and integrations
├── logo.jpg           # Salon logo
└── README.md          # This documentation
```

## Setup Instructions

1. **Basic Setup**
   - All files are ready to use as-is
   - Simply open `index.html` in a web browser
   - No build process or dependencies required

2. **For Development**
   - Use a local web server for best results (Live Server in VS Code recommended)
   - All external dependencies are loaded via CDN

3. **For Production**
   - Upload all files to your web hosting service
   - Ensure logo.jpg is accessible
   - Consider adding SSL certificate for security

## Customization

### Announcement Banner
You can update the announcement banner using JavaScript:

```javascript
// Update announcement message
window.adminFunctions.updateAnnouncement('Holiday Hours: Closed Dec 25th', 'warning');

// Hide announcement
window.adminFunctions.hideAnnouncement();

// Show announcement
window.adminFunctions.showAnnouncement();
```

### Color Scheme
The website uses a warm, earthy color palette based on the architectural theme:
- Primary: `#8B4513` (Saddle Brown)
- Secondary: `#A0522D` (Sienna)
- Accent colors for different message types

### Services and Pricing
Update services in the HTML file (`index.html`) in the services section. Each service card includes:
- Icon (Font Awesome)
- Service name
- Description
- Starting price

### Contact Information
Update contact details in both the contact section and footer of `index.html`.

## Technical Features

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 320px - 767px

### Form Validation
The booking form includes:
- Required field validation
- Email format validation
- Phone number validation
- Business hours validation
- Future date validation

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with graceful degradation)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Integrations

### POS System Integration
The website includes placeholder classes for:
- Payment processing
- Service pricing management
- Inventory tracking

### Scheduling System Integration
Ready for integration with:
- Real-time availability checking
- Staff scheduling
- Appointment management
- Automated confirmations

### Admin Panel
Foundation laid for:
- Content management
- Announcement management
- Booking management
- Analytics dashboard

## Performance Optimizations

- Optimized CSS with efficient selectors
- Debounced scroll events
- Intersection Observer for animations
- Minimal external dependencies
- Compressed and optimized assets

## SEO Features

- Semantic HTML structure
- Proper heading hierarchy
- Meta tags for mobile optimization
- Schema markup ready for implementation
- Clean URLs and navigation structure

## Accessibility Features

- ARIA labels where appropriate
- Keyboard navigation support
- High contrast color ratios
- Scalable fonts and responsive design
- Screen reader friendly structure

## Deployment

### Basic Hosting
1. Upload all files to your web host
2. Ensure directory structure is maintained
3. Update contact information and business details
4. Test all functionality

### Advanced Hosting
For future POS/scheduling integration:
1. Consider hosting with Node.js support
2. Plan for database integration
3. Implement SSL certificates
4. Set up backup systems

## Support and Maintenance

### Regular Updates
- Update announcement banner for holidays/special offers
- Keep contact information current
- Add new services as they become available
- Update gallery with new work samples

### Security Considerations
- Regular backup of website files
- Monitor for security updates
- Implement form spam protection when needed
- Use HTTPS for all transactions

## Browser Console Commands

For testing and administration, use these console commands:

```javascript
// Update announcement
salonWebsite.announcementManager.updateAnnouncement('New message', 'info');

// Test booking form validation
salonWebsite.bookingManager.isValidEmail('test@example.com');

// Access utility functions
salonWebsite.utils.formatPhoneNumber('5551234567');
```

## Contributing

When adding new features:
1. Maintain the existing code structure
2. Follow the established naming conventions
3. Update this README with new features
4. Test on multiple devices and browsers
5. Consider accessibility in all additions

## License

This website template is created for Haircutecture salon. Customize as needed for your specific business requirements.

---

**Note**: Replace placeholder content (contact information, services, pricing) with actual business details before going live.
