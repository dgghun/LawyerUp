"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "incidents",
      [
        {
          type: "Airplane Business Transactions",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Asbestos",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Asylum",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Auto Accident",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Auto Accident (Spanish)",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Aviation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Aviation Accidents",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Bankruptcy",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Business",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Child Custody",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Child Support",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Civil Rights",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Collaborative Divorce",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Commercial Real Estate",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Consumer Protection",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Criminal Defense",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "DUI and DWI",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Debt Settlement",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Deportation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Divorce",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Divorce Mediation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Employment",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Environment",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Estate Planning",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Expungement",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Family",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Foreclosure",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Green Card",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Hernia Mesh",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Immigration Law",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Intellectual Property",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Landlord and Tenant",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Legal Malpractice",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Litigation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Long Term Disability",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Maritime",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Medical Malpractice",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Military Divorce",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Nursing Home or Elder Abuse",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Overtime Pay",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Patents",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Personal Injury",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Probate",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Product Liability",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Real Estate",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "SSDI",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Securities",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Sex Crimes",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Sexual Harassment",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Tax",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Traffic Tickets",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Trucking Accident",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "US Citizenship",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "US Visa",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Unemployment",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Veterans Disability",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Workers Compensation",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Wrongful Death",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          type: "Wrongful Termination",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("incidents", null, {});
  }
};
