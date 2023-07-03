package com.kit.feedback.controller;

import com.kit.feedback.dto.BatchRequest;
import com.kit.feedback.dto.BatchResponse;
import com.kit.feedback.dto.BatchesResponse;
import com.kit.feedback.services.BatchService;
import io.swagger.models.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/batch")
public class BatchController {

    private final BatchService batchService;
    public BatchController(BatchService batchService){
        this.batchService = batchService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<BatchesResponse> getAllBatch(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size){
        return ResponseEntity.ok(batchService.getBatches(page, size));
    }

    @PostMapping("/create")
    public ResponseEntity createBatch(@RequestBody BatchRequest request){
        try{
            return ResponseEntity.ok(batchService.create(request));
        }catch (Exception e)
        {
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<BatchResponse> viewBatch(@RequestParam(name = "id") UUID id){
        return ResponseEntity.ok(batchService.get(id));
    }

    @PostMapping("/edit")
    public ResponseEntity editBatch(@RequestBody BatchRequest request){
        try{
            return ResponseEntity.ok(batchService.edit(request));
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
    }

    @GetMapping("/delete")
    public ResponseEntity<String> deleteBatch(@RequestParam(name = "id") UUID id){
        return ResponseEntity.ok(batchService.delete(id));
    }
}
