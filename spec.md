# PROJECT HANDOFF
## Adarsh Residency — Hotel Website Redesign

### 1. PROJECT OVERVIEW

**Project Name:** Adarsh Residency Website

**Location:** Tirupati, Andhra Pradesh, India

**Project Type:** Hotel business website

**Development Approach:** AI-assisted development with 7 Claude accounts, coordinated through Gemini.

**Developer:** Student developer learning web development through practical implementation.

### PROJECT GOAL

Redesign and modernize the existing Adarsh Residency website, which was developed approximately 15 years ago.

The new website must be:

- Modern and visually appealing.
- Professional and trustworthy.
- Fully responsive across mobile, tablet, and desktop.
- Fast-loading and SEO-friendly.
- Easy to maintain and update.
- Modular and expandable for future features.
- Simple for customers to navigate.
- Focused on encouraging direct phone and WhatsApp enquiries.

The hotel does not have a restaurant.

Therefore, restaurant-related sections, menus, food ordering, and dining reservations are unnecessary.

The website will not have its own payment gateway or online room-booking engine.

Instead, customers can contact the hotel directly or use external booking platforms.

---

# 2. WEBSITE ARCHITECTURE

### Recommended Structure: Hybrid Website

Build a polished homepage with scrolling sections and dedicated pages where additional detail is useful.

### Main Navigation

1. Home
2. Rooms & Tariffs
3. Facilities
4. Gallery
5. Location
6. Contact

Include a prominent **Book Your Stay** button in the navigation.

### Navigation Behaviour

- Clicking homepage section links should smoothly scroll to their respective sections.
- Dedicated pages should open normally.
- Navigation must remain accessible while scrolling.
- Mobile navigation should use a responsive hamburger menu.
- Booking/contact actions must be easy to access from any page.

Avoid creating unnecessary pages.

---

# 3. HOMEPAGE STRUCTURE

The homepage should contain the following sections in order.

### SECTION 1: Navigation Bar

Contains:

- Hotel logo
- Hotel name
- Navigation links
- Book Your Stay button
- Mobile hamburger menu

The navbar should be sticky.

### SECTION 2: Hero Section

The first section visitors see.

Contains:

- Large, high-quality photograph of the actual hotel.
- Hotel name: Adarsh Residency.
- Location: Tirupati.
- Short, welcoming description.
- Primary button: Book Your Stay.
- Secondary button: View Rooms.

The Book Your Stay button should lead to the contact/booking options.

Use a modern layout with clear typography and restrained animations.

### SECTION 3: About the Hotel

Introduce Adarsh Residency.

Include:

- Short hotel description.
- Overview of the accommodation.
- Convenient location.
- Comfort and hospitality.
- A photograph of the property.

The old website mentions 32 rooms, AC/non-AC accommodation, and proximity to the railway station and bus stand.

These details must be verified before publishing.

### SECTION 4: Rooms & Tariffs Preview

Display room cards.

Each room card should support:

- Room name.
- Room photograph.
- Room description.
- AC/non-AC classification.
- Occupancy.
- Amenities.
- Price per night, if provided.
- Enquire Now button.

The enquiry button should open WhatsApp or initiate a phone call.

The room structure must support adding more categories later.

Do not invent prices or availability.

### SECTION 5: Facilities

Display hotel facilities using cards or icons.

The previous website mentions:

- 24-hour room service.
- In-house laundry.
- Travel desk.
- Television.
- Hot and cold running water.
- Parking.

Other facilities, such as Wi-Fi, lifts, or air conditioning, must only be displayed if confirmed.

Facilities must be configurable so they can be added or removed later.

### SECTION 6: Gallery Preview

Display selected photographs.

Support:

- Room photographs.
- Bathroom photographs.
- Reception photographs.
- Exterior photographs.
- Common-area photographs.
- Facility photographs.

Include a View Gallery button.

Use real hotel photographs rather than unrelated stock photography in the published website.

### SECTION 7: Location & Nearby Places

Show the hotel's location and important transport connections.

Include:

- Hotel address.
- Google Maps location link.
- Get Directions button.
- Tirupati Railway Station route.
- Tirupati Central Bus Station route.
- Optional nearby attractions.

**IMPORTANT:**

The developer will provide the Google Maps links later.

Do not attempt to determine or invent the hotel's precise location.

Create configurable placeholders for:

- Hotel Google Maps URL.
- Railway Station → Hotel directions URL.
- Bus Station → Hotel directions URL.
- Optional map embed URL.

Each route button must open Google Maps, where the visitor can view the route, distance, and estimated travel time.

The website does not need to calculate distances itself.

Do not hardcode unverified distances.

### SECTION 8: Contact & Booking

Provide:

- Hotel phone numbers.
- Click-to-call buttons.
- WhatsApp enquiry button.
- Hotel address.
- Google Maps link.
- External booking platforms.

WhatsApp should open a prefilled enquiry message.

Example:

"Hello, I would like to enquire about room availability at Adarsh Residency, Tirupati."

No internal reservation system is required.

### SECTION 9: Footer

Include:

- Hotel name and logo.
- Address.
- Phone number.
- Quick navigation links.
- Google Maps link.
- Copyright notice.
- Optional social media links.

Only display configured social media links.

---

# 4. DEDICATED PAGES

### Rooms & Tariffs Page

Display all available room categories.

Each category should support multiple photographs, amenities, occupancy, description, and pricing.

Include direct enquiry buttons.

### Facilities Page

Display the hotel's available facilities with clear descriptions.

Facilities should be managed through configuration.

### Gallery Page

Provide an expandable image gallery.

Requirements:

- Category filtering.
- Responsive image grid.
- Fullscreen image preview/lightbox.
- Support for adding and removing photographs.
- Lazy loading.
- Optimized images.

### Location Page

Contains:

- Hotel address.
- Optional Google Maps embed.
- Get Directions button.
- Railway Station → Hotel route button.
- Bus Station → Hotel route button.
- Nearby places, if configured.

### Contact Page

Contains:

- Phone numbers.
- WhatsApp enquiry.
- Address.
- Directions.
- External booking options.
- Check-in/check-out information, if available.

A contact form is optional and not required for version one.

---

# 5. EXTERNAL BOOKING PLATFORMS

The hotel may use platforms such as:

- Goibibo.
- MakeMyTrip.
- Booking.com.
- Agoda.
- Other platforms added later.

### Critical Requirement: Conditional Rendering

Each booking platform must have a configurable URL.

**If a URL exists:** Display the corresponding booking button.

**If the URL is empty or missing:** Hide that booking button completely.

If no external booking links are configured, hide the external booking section.

Do not show disabled buttons or broken links.

External booking links should open in a new tab.

The website itself must not process payments.

---

# 6. GOOGLE MAPS INTEGRATION

The developer will manually provide all required location URLs.

Create placeholders such as:

```js
const location = {
  address: "",

  hotelMapsUrl: "",

  railwayStationRouteUrl: "",

  busStationRouteUrl: "",

  mapEmbedUrl: ""
};
```

### Required Behaviour

**Get Directions**

Opens the configured hotel location in Google Maps.

**From Railway Station**

Opens Google Maps directions from Tirupati Railway Station to the hotel.

**From Bus Station**

Opens Google Maps directions from Tirupati Central Bus Station to the hotel.

Google Maps handles:

- Route calculation.
- Distance.
- Estimated travel time.
- Navigation.

Do not implement a custom navigation system.

Hide map-related buttons when their required URLs are not configured.

---

# 7. CONTENT MANAGEMENT — OPTION A

Use configuration-based content management.

The developer wants to become comfortable working with code.

Therefore, an admin dashboard is unnecessary for version one.

Hotel information must be stored separately from presentation components.

### Configurable Content

The developer must be able to update:

- Hotel name.
- Description.
- Address.
- Contact numbers.
- WhatsApp number.
- Room categories.
- Room descriptions.
- Room prices.
- Room photographs.
- Facilities.
- Gallery photographs.
- Google Maps links.
- External booking links.
- Check-in/check-out times.
- Hotel policies.
- Social media links.

Updating content should not require modifying the website's layout components.

### Future Requirement

Design the architecture so configuration-based content can eventually be replaced by a database or content management system.

A future admin dashboard may allow the hotel owner to:

- Upload photographs.
- Edit prices.
- Update room details.
- Modify facilities.
- Manage booking links.
- Update hotel information.

**Do not build the dashboard now.**

---

# 8. RECOMMENDED TECHNICAL ARCHITECTURE

Gemini should evaluate the most suitable technology stack before implementation.

A reasonable starting recommendation is:

**Frontend:** Next.js with React and TypeScript.

**Styling:** Tailwind CSS.

**Content Management:** TypeScript configuration files or structured JSON.

**Images:** Local optimized image assets.

**Hosting:** A suitable static-compatible hosting service.

**Backend:** Not required for version one.

**Database:** Not required for version one.

**Authentication:** Not required.

**Payment Gateway:** Not required.

### Suggested Folder Structure

```text
adarsh-residency/
│
├── public/
│   ├── images/
│   │   ├── hotel/
│   │   ├── rooms/
│   │   ├── gallery/
│   │   └── facilities/
│   │
│   └── logo/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── rooms/
│   │   ├── facilities/
│   │   ├── gallery/
│   │   ├── location/
│   │   └── contact/
│   │
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── rooms/
│   │   ├── gallery/
│   │   └── ui/
│   │
│   ├── config/
│   │   ├── hotel.ts
│   │   ├── rooms.ts
│   │   ├── facilities.ts
│   │   ├── gallery.ts
│   │   ├── booking.ts
│   │   └── location.ts
│   │
│   ├── lib/
│   │
│   ├── types/
│   │
│   └── styles/
│
├── package.json
│
└── README.md
```

This structure is a starting proposal, not an immutable requirement.

Gemini should refine it before coding.

---

# 9. DESIGN REQUIREMENTS

The old website contains:

- Outdated visual styling.
- A decorative patterned background.
- Small photographs.
- Dense paragraphs.
- Crowded navigation.
- An unsupported Adobe Flash element.
- Limited visual hierarchy.

The redesign should eliminate these problems.

### Desired Visual Direction

Modern, elegant, welcoming, and professional.

Avoid making the hotel appear artificially luxurious.

The design should reflect the actual property.

Use:

- Clean layouts.
- Comfortable spacing.
- Readable typography.
- Large authentic photographs.
- Consistent colours.
- Subtle hover effects.
- Smooth scrolling.
- Restrained animations.

Avoid:

- Excessive motion effects.
- Heavy animation libraries without a reason.
- Autoplay audio.
- Flash content.
- Unnecessary pop-ups.
- Cluttered navigation.

The website must prioritize usability over visual effects.

---

# 10. RESPONSIVENESS

The website must work on:

- Mobile phones.
- Tablets.
- Laptops.
- Desktop monitors.

Mobile visitors should be able to:

- View room photographs.
- Read room information.
- Call the hotel.
- Open WhatsApp.
- Access booking platforms.
- Navigate through Google Maps.

Buttons must be touch-friendly.

---

# 11. SEO REQUIREMENTS

Implement basic search-engine optimization.

Include:

- Descriptive page titles.
- Meta descriptions.
- Semantic HTML.
- Proper heading hierarchy.
- Descriptive image alt text.
- Sitemap.
- Robots.txt.
- Canonical URLs.
- Open Graph metadata.
- Hotel structured data where appropriate.
- Search-friendly URLs.

Target relevant searches such as:

"Hotels in Tirupati"

"Rooms near Tirupati Railway Station"

"Accommodation in Tirupati"

Only use location-related claims that are verified.

Do not promise specific Google rankings.

---

# 12. PERFORMANCE & ACCESSIBILITY

Requirements:

- Fast initial loading.
- Optimized images.
- Lazy-loaded gallery images.
- Minimal unnecessary JavaScript.
- Responsive image sizes.
- Proper caching.
- Keyboard-accessible navigation.
- Accessible buttons and links.
- Sufficient colour contrast.
- Visible keyboard focus indicators.
- Reduced-motion support.
- No broken links.
- HTTPS.

Prioritize practical performance rather than unnecessary optimization complexity.

---

# 13. IMPORTANT BUSINESS INFORMATION

Before publishing, collect and verify:

**Hotel identity**
- Official hotel name.
- Logo.
- Complete address.
- Phone and WhatsApp numbers.

**Accommodation**
- Room categories.
- Room photographs.
- Prices, if displayed.
- Maximum occupancy.
- Available facilities.

**Policies**
- Check-in time.
- Check-out time.
- Cancellation policy, if applicable.
- Accepted payment methods, if displayed.
- Identification requirements, if applicable.
- Extra-bed and child policies, if applicable.

**Location**
- Verified Google Maps links.
- Nearby transport routes.

**External platforms**
- Actual hotel listing URLs.

**Branding**
- Preferred colours.
- Logo files.
- Authentic hotel photographs.

Missing information should remain configurable and unpublished until confirmed.

---

# 14. FEATURES NOT REQUIRED IN VERSION ONE

Do not implement:

- Internal booking engine.
- Online payment gateway.
- Room availability database.
- User accounts.
- Customer login.
- Admin dashboard.
- Restaurant functionality.
- Food ordering.
- Complex backend infrastructure.
- Automated reservation confirmation.
- Unnecessary third-party services.

These are outside the initial scope.

---

# 15. FUTURE EXPANSION

The website must support future development without major restructuring.

Possible future features:

- Admin dashboard.
- Database-backed content.
- Image upload interface.
- Multilingual support.
- Room availability management.
- Online reservations.
- Customer reviews.
- Analytics dashboard.
- Additional booking integrations.

These are possibilities, not current requirements.

Use modular components and clear data models.

Avoid overengineering the initial version.

---

# 16. DEVELOPMENT WORKFLOW

The developer will use:

**Gemini:** Overall project planning, task coordination, technical guidance, and integration planning.

**7 Claude accounts:** AI-assisted implementation, code review, debugging, testing, and other development tasks.

Gemini must determine how best to divide work between the seven accounts.

### Important Coordination Rules

1. Establish the complete architecture before distributing coding tasks.
2. Define shared component interfaces and data structures.
3. Assign clear responsibilities.
4. Prevent multiple accounts from making conflicting changes.
5. Establish consistent naming and coding conventions.
6. Keep one authoritative project repository.
7. Use Git for version control.
8. Integrate and test completed work incrementally.
9. Keep dependencies consistent.
10. Ensure all generated code is reviewed before integration.

The seven accounts should not independently design incompatible versions of the same website.

Parallel development should only begin after shared architectural decisions are established.

---

# 17. INSTRUCTIONS FOR GEMINI

You are acting as the technical architect, development mentor, and project coordinator for the Adarsh Residency website.

Your responsibility is to guide a student developer through building this project with assistance from seven Claude accounts.

The developer wants to understand the code rather than blindly copy AI-generated output.

### Your Tasks

**Task 1 — Architecture**

Review the entire specification.

Recommend the final technology stack and folder structure.

Explain important architectural decisions briefly.

**Task 2 — Work Distribution**

Create an efficient plan for using seven Claude accounts.

For each account, define:

- Responsibility.
- Exact deliverables.
- Dependencies.
- Files it may modify.
- Integration requirements.
- Testing requirements.

**Task 3 — Development Phases**

Divide implementation into manageable phases.

Each phase should have a clear objective and completion criteria.

**Task 4 — Claude Prompts**

Prepare precise prompts for each Claude account.

Each prompt must contain enough context for that account to work independently without making conflicting assumptions.

**Task 5 — Integration**

Explain how the developer should combine the outputs from different Claude accounts.

Include Git workflow guidance and conflict prevention.

**Task 6 — Learning**

Explain what the developer should understand while implementing each phase.

Avoid overwhelming the developer with unnecessary theory.

**Task 7 — Deployment**

Guide the developer through testing, deployment, domain configuration, and launch.

### Communication Requirements

The developer strongly prefers concise, direct, actionable instructions.

Do not produce excessively long explanations during implementation.

Give one manageable step at a time.

Explain what to do, why it matters, and how to verify completion.

Do not skip critical requirements.

Ask questions only when necessary.

### Final Objective

Deliver a complete, production-ready, modern website for Adarsh Residency, Tirupati.

The website should help visitors explore the property, view rooms and facilities, find the hotel, contact staff, and access external booking platforms.

It must be easy to maintain through configuration files and designed to support an admin dashboard in the future.

**Begin by reviewing the specification, identifying any genuine gaps, and proposing the most efficient development strategy for coordinating the seven Claude accounts. Do not begin generating the entire website immediately.**