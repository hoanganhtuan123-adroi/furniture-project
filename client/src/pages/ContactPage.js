import React from "react";
import "../assets/css/contactpage.css";
const contactPage = () => {
    return (
        <div class="container contact-container">
            <div class="contact-info">
                <h2>Get In Touch With Us</h2>
                <p>
                    For more information about our product & services, please
                    feel free to drop us an email. Our staff always be there to
                    help you out. Do not hesitate!
                </p>

                <div class="info-item">
                    <i class="fas fa-map-marker-alt icon"></i>
                    <div>
                        <h5>Address</h5>
                        <p>
                            236 5th SE Avenue, New York NY10000, United States
                        </p>
                    </div>
                </div>

                <div class="info-item">
                    <i class="fas fa-phone icon"></i>
                    <div>
                        <h5>Phone</h5>
                        <p>
                            Mobile: (+84) 546-6789
                            <br />
                            Hotline: (+84) 456-6789
                        </p>
                    </div>
                </div>

                <div class="info-item">
                    <i class="fas fa-clock icon"></i>
                    <div>
                        <h5>Working Time</h5>
                        <p>
                            Monday-Friday: 9:00 - 22:00
                            <br />
                            Saturday-Sunday: 9:00 - 21:00
                        </p>
                    </div>
                </div>
            </div>

            <div class="contact-form">
                <form method="POST">
                    <div class="mb-4">
                        <label for="name" class="form-label">
                            Your Name
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            name="name"
                            placeholder="Abcd"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="form-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            name="email"
                            placeholder="Abcd@def.com"
                            required
                        />
                    </div>
                    <div class="mb-4">
                        <label for="subject" class="form-label">
                            Subject
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            id="subject"
                            name="subject"
                            placeholder="This is an optional"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="message" class="form-label">
                            Message
                        </label>
                        <textarea
                            class="form-control"
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Hi! I'd like to ask about"
                            required
                        ></textarea>
                    </div>
                    <div class="text-center">
                        <button
                            type="submit"
                            name="submit_contact"
                            class="btn btn-submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default contactPage;
