# Stairing is Caring

Jira Project
https://blueprintconsultingservices.atlassian.net/secure/RapidBoard.jspa?rapidView=12

#### UAT Goal Date: TBD

### In progress
- [ ] Custom or random images for objects
- [ ] Write API atop stored procs
- [ ] Replace static JSON files with API calls
- [ ] Server-side form handling

### Backlog
- [ ] DNS update
- [ ] Final hosting in AWS
- [ ] Automated deployment
- [ ] SQL Injection security
- [ ] Routing and dynamic pages (generate markup for each object in DB)
- [ ] Authentication
- [ ] Admin UI (enables an admin to create/edit/delete any object)
- [ ] Type to Search Company list from JSON
- [ ] Add Heart Guy to other pages
- [ ] Teams list: Handle Donate and Join buttons
- [ ] Update Team workflow
- [ ] All Comments page?

### Complete
- [x] Mobile CSS
- [x] Site Footer
- [x] Readme.md To-do list
- [x] S3 hosting
- [x] Client-side form validation
- [x] UX Design
- [x] HTML built using static content
- [x] Desktop and tablet CSS
- [x] MySQL database schema
- [x] Data-binding to static JSON files
- [x] Stored procedures design
- [x] Write Stored procedures


### Stored Procedures

#### GetTotalDonation
* Total donations from all Teams
* JSON Format: {"totalDonation": [{"amount": 46}]}

#### GetHomeTotals
* CALL GetHomeTotals()
* Reference: home-totals.json

#### GetEvents
* CALL GetEvents()
* Reference: events.json

#### GetCompanyByDonation
* CALL GetCompanyByDonation()
* Top 5 Companies by Avg Team Donations per company
* Reference: top-company-list.json
* Removed total stairs and stairs percent of leader

#### GetTopCompanyByStairs
* CALL GetTopCompanyByStairs()
* Top 5 Companies by total Stairs
* Reference: top-company-list.json
* Removed donations and donations as percent of leader

#### GetTopTeamsByDonation
* CALL GetTopTeamsByDonation()
* Top 5 Teams by Donations
* Reference: top-team-list.json
* Removed total stairs and stairs percent of leader

#### GetTopTeamsByStairs
* CALL GetTopTeamsByStairs()
* Top 5 Teams by Stairs
* Reference: top-team-list.json
* Removed total donations and donations as percent of leader

#### GetRecentComments
* CALL GetRecentComments()
* Five most recent Comments, ordered by datetime
* Reference: recent-comments-data.json
* Question regarding the format of the JSON (nested arrays) and the data

#### To do
- [ ] Need permissions to create triggers on the table
- [ ] Need to fix local currency and timezone and add them as columns to the tables
- [ ] Images need to be handled appropriately
