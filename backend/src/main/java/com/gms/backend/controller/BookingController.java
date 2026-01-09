package com.gms.backend.controller;

import com.gms.backend.dto.MessageResponse;
import com.gms.backend.model.Booking;
import com.gms.backend.model.User;
import com.gms.backend.repository.BookingRepository;
import com.gms.backend.repository.UserRepository;
import com.gms.backend.security.services.UserDetailsImpl;
import com.gms.backend.security.RequiresPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    BookingRepository bookingRepository;

    @Autowired
    UserRepository userRepository;

    @GetMapping("/trainers")
    public ResponseEntity<List<User>> getAvailableTrainers() {
        List<User> trainers = userRepository.findByStatus("APPROVED");
        return ResponseEntity.ok(trainers);
    }

    @PostMapping("/book")
    @PreAuthorize("hasRole('USER')")
    @RequiresPlan(feature = "BOOK_TRAINER")
    public ResponseEntity<?> createBooking(@RequestBody Booking bookingRequest) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User user = userRepository.findById(userDetails.getId()).get();
        User trainer = userRepository.findById(bookingRequest.getTrainerId())
                .orElseThrow(() -> new RuntimeException("Error: Trainer not found."));

        Booking booking = new Booking();
        booking.setUserId(user.getId());
        booking.setUserName(user.getFullName() != null ? user.getFullName() : user.getUsername());
        booking.setTrainerId(trainer.getId());
        booking.setTrainerName(trainer.getFullName() != null ? trainer.getFullName() : trainer.getUsername());
        booking.setWorkoutType(bookingRequest.getWorkoutType());
        booking.setBookingDate(LocalDateTime.now());
        booking.setSessionDateTime(bookingRequest.getSessionDateTime());
        booking.setStatus("PENDING");
        booking.setMessage(bookingRequest.getMessage());

        // Set new fields
        booking.setUserWeight(bookingRequest.getUserWeight());
        booking.setUserHeight(bookingRequest.getUserHeight());
        booking.setPracticePreferences(bookingRequest.getPracticePreferences());

        bookingRepository.save(booking);
        return ResponseEntity.ok(new MessageResponse("Booking requested successfully!"));
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<Booking>> getUserBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(bookingRepository.findByUserId(userDetails.getId()));
    }

    @GetMapping("/trainer")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<List<Booking>> getTrainerBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(bookingRepository.findByTrainerId(userDetails.getId()));
    }

    @PutMapping("/{id}/accept")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<?> acceptBooking(@PathVariable String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Booking not found."));

        booking.setStatus("ACCEPTED");
        bookingRepository.save(booking);
        return ResponseEntity.ok(new MessageResponse("Booking accepted!"));
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('TRAINER')")
    public ResponseEntity<?> rejectBooking(@PathVariable String id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error: Booking not found."));

        booking.setStatus("REJECTED");
        bookingRepository.save(booking);
        return ResponseEntity.ok(new MessageResponse("Booking rejected!"));
    }

    @GetMapping("/admin/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }
}
