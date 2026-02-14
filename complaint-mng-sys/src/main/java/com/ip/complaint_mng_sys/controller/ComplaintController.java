package com.ip.complaint_mng_sys.controller;

import com.ip.complaint_mng_sys.dto.ComplaintRequest;
import com.ip.complaint_mng_sys.dto.StatusUpdateRequest;
import com.ip.complaint_mng_sys.entity.Complaint;
import com.ip.complaint_mng_sys.entity.enums.ComplaintStatus;
import com.ip.complaint_mng_sys.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

//    @GetMapping("/home")
//    public String greet() {
//        return "Welcome to Complaint Management System";
//    }
//
//    @GetMapping("/complaints")
//    public ResponseEntity<List<Complaint>> getAllComplaints() {
//        return new ResponseEntity<>(service.getAllComplaints(), HttpStatus.OK);
//
//    }
//
//
//    @GetMapping(value = "/complaint/{id}")
//    public ResponseEntity<Complaint> getComplaintById(@PathVariable int id) {
//        Complaint complaint = service.getComplaintById(id);
//        if (complaint != null) {
//            return new ResponseEntity<>(complaint, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }
//
//    @PostMapping("/complaint")
//    public ResponseEntity<Complaint> createComplaint(@RequestBody Complaint complaint) {
//        System.out.println(complaint);
//        Complaint createdComplaint = service.createComplaint(complaint);
//
//       return new ResponseEntity<>(createdComplaint, HttpStatus.CREATED);
//    }




    @PostMapping("/complaints")
    public ResponseEntity<Complaint> create(@RequestBody ComplaintRequest request) {
        Complaint created = complaintService.createComplaint(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/complaints/my/{userId}")
    public List<Complaint> myComplaints(@PathVariable Long userId) {
        return complaintService.getUserComplaints(userId);
    }

    @GetMapping("/complaints/{id}")
    public Complaint getOne(@PathVariable Long id) {
        return complaintService.getComplaint(id);
    }

    @GetMapping("/admin/complaints/all")
    public List<Complaint> getAll() {
        return complaintService.getAllComplaints();
    }

    @PutMapping("/admin/complaints/{id}/status")
    public ResponseEntity<Complaint> updateStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        Complaint updated = complaintService.updateStatus(id, request.status);
        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

}