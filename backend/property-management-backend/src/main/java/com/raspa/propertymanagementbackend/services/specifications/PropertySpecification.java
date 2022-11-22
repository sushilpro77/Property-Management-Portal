package com.raspa.propertymanagementbackend.services.specifications;

import com.raspa.propertymanagementbackend.entities.Location;
import com.raspa.propertymanagementbackend.entities.Location_;
import com.raspa.propertymanagementbackend.entities.Property;
import com.raspa.propertymanagementbackend.entities.Property_;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;

//Owners and Customers can filter properties:

//by price,
public class PropertySpecification {
    public static Specification propertyHasPrice(Double price) {
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.lessThanOrEqualTo(root.get(Property_.price), price);
            }
        };

    }
    //by property type,
    public static Specification propertyHasPropertyType(String propertyType) {
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(Property_.propertyType), propertyType);
            }
        };
    }

    //by a number of rooms,
    public static  Specification propertyHasNumbersOfRooms(Integer numberOfRooms){
        return  new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(Property_.numberOfRooms),numberOfRooms );
            }
        };
    }
    //home type,
    public static  Specification propertyHasHomeType(String homeType){
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                return  criteriaBuilder.equal(root.get(Property_.homeType),homeType);           }
        };
    }

//by location.
    public static Specification propertyHasLocation(String location){
        return  new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                Join<Property, Location> joinPropertyLocation = root.join(Property_.location);
                return joinPropertyLocation.get(Location_.name).in(location);
            }
        };
    }
}
