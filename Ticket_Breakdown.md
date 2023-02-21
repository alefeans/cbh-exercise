# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

## Ticket 1 - Enable Facilities to add Custom Agent IDs on the Frontend

**Context**

To make it possible for Facilities to add custom Agent IDs in the PDF report, we need to accept this new information on the frontend. In the Facilitie's shifts panel, we should add a new field for the user to set the desired custom ID for an Agent and send it to our backend.

**Implementation Details**

We should never trust user input, so before accepting the new custom ID, we should sanitize it to prevent any malicious code injection like XSS, SQL Injection, etc. Using some `Input` form component from a React components library (e.g Chakra, MUI, etc), may be sufficient to prevent this kind of situation. Nevertheless, we should test it on our side.

**Acceptance Criteria**

This new field should accept any **sanitized** not empty string, with a size limit of 256 characters.

The PR should contain tests for all these cases:
- [] Not accepting empty strings
- [] String size limit check
- [] Malicious code injection prevention

**Time Estimate**

1 hour.

## Ticket 2 - Add the Custom Agent ID on the Database

**Context**

To make it possible for Facilities to see their custom Agent IDs in the PDF report, we need to add the custom ID field in our database.

**Implementation Details**

As an Agent can work for multiple Facilities, we should add the new Agent custom ID in the N:N Shifts relationship table, so we can have multiple custom IDs set for the same Agent by different Facilities. The database field should be a VARCHAR.

**Acceptance Criteria**

This new field should accept any string and the migrations should be applied in the Staging and Production databases.

**Time Estimate**

30 minutes.

## Ticket 3 - Accept the new field on the Backend API

**Context**

To make it possible for Facilities to add custom Agent IDs in the PDF report, we need to accept this new field in our REST API request body to store it on the database.

**Implementation Details**

We need to update our input schemas to accept this new optional field. This field is a not empty string with a size limit of 256 characters and should be validated by our schema validator middleware before reaching our internal use cases modules/functions. If the request body includes this field, we should add it to the Shifts relationship.

**Acceptance Criteria**

The PR should contain:
- [] Tests for schema validation
- [] Integration tests to receive and store the new field
- [] Updated docs

**Time Estimate**

2 hours.

## Ticket 4 - Update the PDF report to present Custom Agent IDs

**Context**

As a last step, we should update the PDF report to present the new custom ID.

**Implementation Details**

The report API should generates PDFs containing the Agen'ts custom ID fallbacking to the original database ID when not present.

**Acceptance Criteria**

The PR should contain tests for cases where custom IDs exist or not.

We should have an example of a PDF report using our Staging environment.

After the validation, we can send this feature to Production.

**Time Estimate**

1 hour.