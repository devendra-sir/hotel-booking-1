document.addEventListener('DOMContentLoaded', function () {
    // Initially hide the room availability section
    document.querySelector('.room-availability').style.display = 'none';

    // Search Rooms Button
    document.getElementById('search-rooms').addEventListener('click', function () {
        const checkinDate = new Date(document.getElementById('checkin').value);
        const checkoutDate = new Date(document.getElementById('checkout').value);
        const today = new Date();
        const nextWeekDate = new Date(today);
        nextWeekDate.setDate(today.getDate() + 7);

        // Validate if dates are for the next week
        if (checkinDate > today && checkinDate <= nextWeekDate && checkoutDate > checkinDate) {
            updateRoomAvailability(checkinDate, checkoutDate);
            // Show the room availability section
            document.querySelector('.room-availability').style.display = 'block';
        } else {
            alert("Please select valid dates for the next week.");
        }
    });

    // Update Room Availability Section
    function updateRoomAvailability(checkinDate, checkoutDate) {
        const rooms = [
            { number: 1, status: 'available' },
            { number: 2, status: 'booked' },
            { number: 3, status: 'reserved' },
            { number: 4, status: 'available' },
            { number: 5, status: 'available' },
            { number: 6, status: 'reserved' },
            { number: 7, status: 'booked' },
            { number: 8, status: 'available' },
            { number: 9, status: 'available' },
            { number: 10, status: 'booked' },
        ];

        let availabilityHtml = `
            <table>
                <tr>
                    <th>Room Number</th>
                    <th>Status</th>
                    <th>Check-in Date</th>
                    <th>Check-out Date</th>
                    <th>Timing</th>
                </tr>`;

        rooms.forEach(room => {
            let statusSymbol = '';
            if (room.status === 'available') {
                statusSymbol = '<span style="color: green;">●</span>';
            } else if (room.status === 'booked') {
                statusSymbol = '<span style="color: red;">●</span>';
            } else if (room.status === 'reserved') {
                statusSymbol = '🔒';
            }

            availabilityHtml += `
                <tr>
                    <td>Room ${room.number}</td>
                    <td>${statusSymbol}</td>
                    <td>${checkinDate.toLocaleDateString()}</td>
                    <td>${checkoutDate.toLocaleDateString()}</td>
                    <td>${checkinDate.getHours()}:${checkinDate.getMinutes().toString().padStart(2, '0')} - ${checkoutDate.getHours()}:${checkoutDate.getMinutes().toString().padStart(2, '0')}</td>
                </tr>`;
        });

        availabilityHtml += '</table>';

        document.getElementById('room-availability').innerHTML = availabilityHtml;

        // Display the check-in and check-out dates
        document.getElementById('dates-display').innerHTML = `
            <p>Check-in Date: ${checkinDate.toLocaleDateString()}</p>
            <p>Check-out Date: ${checkoutDate.toLocaleDateString()}</p>
        `;
    }

    // Filter Rooms Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            roomCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal Logic for Booking
    const modal = document.getElementById('bookingModal');
    const closeModal = document.getElementById('closeModal');

    document.querySelectorAll('.btn-book').forEach(button => {
        button.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
