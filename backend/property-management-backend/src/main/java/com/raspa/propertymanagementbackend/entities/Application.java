package com.raspa.propertymanagementbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@SQLDelete(sql = "UPDATE application SET deleted = true WHERE id=?")
@FilterDef(name = "deletedApplicationFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedApplicationFilter", condition = "deleted = :isDeleted")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Boolean isForRent;
    private Boolean isForSell;
    private LocalDate submissionDate;

    @ManyToOne
    private User user;

    @ManyToOne
    private Property property;

    private boolean deleted = Boolean.FALSE;
}
