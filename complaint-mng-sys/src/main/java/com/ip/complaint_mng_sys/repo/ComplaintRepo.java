package com.ip.complaint_mng_sys.repo;

import com.ip.complaint_mng_sys.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ComplaintRepo extends JpaRepository<Complaint, Integer> {

    List<Complaint> findByUserId(Long userId);


}