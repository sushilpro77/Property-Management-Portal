package com.raspa.propertymanagementbackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;

import javax.persistence.*;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@SQLDelete(sql = "UPDATE property SET deleted = true WHERE id=?")
@FilterDef(name = "deletedPropertyFilter", parameters = @ParamDef(name = "isDeleted", type = "boolean"))
@Filter(name = "deletedPropertyFilter", condition = "deleted = :isDeleted")
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private Boolean isForSell;

    private Boolean isForRent;
    private Integer numberOfRooms;
    private Double price;
    private String propertyType;
    private String homeType;
    private String description;

    @ManyToOne
    private Location location;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL)
    private List<Image> images;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "property")
    private List<Application> applications;

    private boolean deleted = Boolean.FALSE;

}
