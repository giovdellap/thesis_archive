# Automation of ProjPP module

## Folder scaffolding

N.B.:
    - (E): empty folder at automation process start
    - (F): full folder at automation process start

- Project  
    - source (F)
    - GEN_DOC (E)
    - source.zip
    - old documentation
    - User Stories.txt
    - services (F)

## Activities Types

- API CALL
    - RAG: PRESENT/NONE
    - SYSTEM PROMPT: (customGPT name)
    - USER PROMPT: (customGPT name)/NONE
    - USER INPUT: Source code
    - OUTPUT: (file type)
        - (file name)

- HUMAN VERIFICATION
    - OK: Go to (activity)
    - NO: (...)

- SAVE (file name) from (activity) to (path)

- CREATE FOLDER (folder name) in (path)

- UNIFY DOCUMENTS
    - INPUT:
        - (path file 1)
        - (path file 2)
    
    - OUTPUT: (path output file)


## Detailed activities pripeline:

1. API CALL Container List Generator
    - RAG: PRESENT
    - SYSTEM PROMPT: Container List Generator
    - USER PROMPT: NONE
    - USER INPUT: Source code
    - OUTPUT: Document B (containers and services list)
        - DOCUMENT_B.txt

2. HUMAN VERIFICATION DOCUMENT_B.txt
    - OK: Go to 3
    - NO: Regenerate

3. SAVE DOCUMENT_B.txt from **1** to /GEN_DOC

4. CREATE FOLDERS in /GEN_DOC
    - For each container, create the following scaffolding:
        - container_name

5. Document D Generation **for each service except DBs**



### 5 -  Document D Generation (service documentation)

1. Is the service a DB service?
    - YES: DO NOT generate documents for the service
    - NO: Go to

2. Is the service a frontend service?
    - YES: Go to 
    - NO: Go to 

3. CREATE FOLDER service_name in /GEN_DOC/container_name

4. API CALL Unified Endpoints Generator
    - RAG: PRESENT
    - SYSTEM PROMPT: Unified Endpoints Generator
    - USER PROMPT: NONE
    - USER INPUT:
        - /User Stories.txt
        - /services/service.zip or single source files (inserted by the operator)
    - OUTPUT: Document D endpoints-datastructures
        - endpoints-datastructures.txt

5. HUMAN VERIFICATION endpoints-datastructures.txt
    - OK: Go to **6**
    - NO: Regenerate/Go to **8**
    
6. SAVE endpoint-datastructures.txt in /GEN_DOC/container_name/service_name

7. GO TO **15**

8. API CALL Endpoints Solo Generator
    - RAG: PRESENT
    - SYSTEM PROMPT: Endpoints Solo Generator
    - USER PROMPT: NONE
    - USER INPUT:
        - User Stories.txt
        - services/service.zip or single source files (inserted by the operator)
    - OUTPUT: Document D endpoints
        - endpoints.txt

9. HUMAN VERIFICATION endpoints.txt
    - OK: Go to **8**
    - NO: Regenerate

10. SAVE endpoints.txt in /GEN_DOC/container_name/service_name

11. API CALL DataStructures Solo Generator
    - RAG: PRESENT
    - SYSTEM PROMPT: DataStructures Solo Generator
    - USER PROMPT: NONE
    - USER INPUT:
        - /User Stories.txt
        - /GEN_DOC/container_name/service_nameendpoints.txt
        - /services/service.zip or single source files (inserted by the operator)
    - OUTPUT: Document D endpoints
        - endpoints.txt

12. HUMAN VERIFICATION datastructures.txt
    - OK: Go to **13**
    - NO: Regenerate

13. SAVE datastructures.txt in /GEN_DOC/container_name/service_name

14. UNIFY DOCUMENTS
    - INPUT:
        - /GEN_DOC/container_name/service_name/endpoints.txt
        - /GEN_DOC/container_name/service_name/datastructures.txt
    - OUTPUT: /GEN_DOC/container_name/service_name/endpoints-datastructures.txt

15. 

