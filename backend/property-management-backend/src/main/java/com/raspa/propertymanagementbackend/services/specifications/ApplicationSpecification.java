package com.raspa.propertymanagementbackend.services.specifications;

import com.raspa.propertymanagementbackend.entities.*;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.time.LocalDate;

public class ApplicationSpecification {
    public static Specification applicationHasPropertyId(long propertyId) {
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                Join<Application, Property> joinApplicationProperty = root.join(Application_.property);
                return joinApplicationProperty.get(Property_.id).in(propertyId);
            }
        };
    }

    public static Specification applicationHasSubmissionDate(LocalDate submissionDate) {
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                return criteriaBuilder.equal(root.get(Application_.submissionDate), submissionDate);
            }
        };
    }

    public static Specification applicationHasLocationId(String locationId) {
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
//               Join<Application, Location> applicationApplicationJoin = root.join(Application_.property);
               // TODO Multiple Joins
               Join<Application, Property> applicationApplicationJoin = root.join(Application_.property);
                return applicationApplicationJoin.get(Property_.id).in(locationId);

            }
        };
    }

    public static Specification applicationHasUser(User user) {
        return new Specification() {
            @Override
            public Predicate toPredicate(Root root, CriteriaQuery query, CriteriaBuilder criteriaBuilder) {
                Join<Application, Property> applicationUserJoin = root.join(Application_.user);
                return applicationUserJoin.get(Property_.id).in(user.getId());
            }
        };
    }
}
