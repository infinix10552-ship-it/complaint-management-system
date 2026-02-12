package com.ip.complaint_mng_sys.service;

import com.ip.complaint_mng_sys.dto.ComplaintRequest;
import com.ip.complaint_mng_sys.entity.Complaint;
import com.ip.complaint_mng_sys.entity.User;
import com.ip.complaint_mng_sys.entity.enums.ComplaintStatus;
import com.ip.complaint_mng_sys.repo.ComplaintRepo;
import com.ip.complaint_mng_sys.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepo complaintRepo;

    @Autowired
    private UserRepo userRepo;

    public Complaint createComplaint(ComplaintRequest request) {
        // 1. Fetch User (Handle potential ID mismatch)
        User user = userRepo.findById((int) request.user_id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + request.user_id));

        // 2. Build Complaint
        Complaint complaint = new Complaint();
        complaint.setTitle(request.title);
        complaint.setDescription(request.description);
        complaint.setCategory(request.category);
        complaint.setStatus(ComplaintStatus.OPEN);

        // 3. Set Date manually (Server Time)
        complaint.setCreatedAt(new Date());

        complaint.setUser(user);

        return complaintRepo.save(complaint);
    }

    public List<Complaint> getUserComplaints(Long userId) {
        return complaintRepo.findByUserId(userId);
    }

    public Complaint getComplaint(Long id) {
        return complaintRepo.findById(Math.toIntExact(id)).orElseThrow();
    }

    public List<Complaint> getAllComplaints() {
        return complaintRepo.findAll();
    }

    public Complaint updateStatus(Long id, ComplaintStatus status) {
        Complaint complaint = complaintRepo.findById(Math.toIntExact(id)).orElseThrow();
        complaint.setStatus(status);
        return complaintRepo.save(complaint);
    }
}




























