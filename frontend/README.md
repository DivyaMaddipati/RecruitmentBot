allot conf file task to ashish
converting data to json with the following structure

tables:

```hr
    name
    email
    password
    company
    role
    jobsPosted
        jobId


candidates
    name
    email
    password
    exp
    interestedDomains
    interestedRoles
    jobApplied
        jobId
        status

job
    postedBy
    role
    exp
    compensation
    skillSet
    location
    description // need to limit it later
    testDetails
        // section wise questions
    appliedCandidates
        candidateId
        score // qualaification score can be determined by the recruiter which will be editable later as well
        status
```
