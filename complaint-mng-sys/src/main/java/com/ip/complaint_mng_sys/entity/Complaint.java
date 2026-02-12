package com.ip.complaint_mng_sys.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.ip.complaint_mng_sys.entity.enums.ComplaintStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@SuppressWarnings("JpaDataSourceORMInspection")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private String description;
    private String category;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
    private Date createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "complaint_status")
    private ComplaintStatus status;

    // Use EAGER fetching so the user data is available for the Admin Dashboard
    // Ignore hibernate properties to prevent serialization errors
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    public void setStatus(ComplaintStatus complaintStatus) {
        this.status = complaintStatus;
    }
}