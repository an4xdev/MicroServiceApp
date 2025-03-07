package org.student.microserviceapp.javaservice.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.student.microserviceapp.javaservice.models.TestModel;

@RestController
public class TestRestController {

    @GetMapping("/test")
    public TestModel test() {
        TestModel testModel = new TestModel();
        testModel.code = 200;
        testModel.message = "Hello from Java Service!";
        testModel.success = true;
        return testModel;
    }
}
