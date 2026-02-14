package com.ip.complaint_mng_sys.dto;

public class ComplaintRequest {

    public String title;
    public String description;
    public long user_id;
    public String category;

    // REMOVED 'created_at' to prevent parsing errors

    public enum complaint_status {
        OPEN,
        IN_PROGRESS,
        RESOLVED,
        CLOSED
    }
}