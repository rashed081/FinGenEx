CREATE OR REPLACE PACKAGE CUSTOMER_INFO_HANDLER AS
  PROCEDURE INSERT_CUSTOMER_INFO(
    p_customer_nid      IN CUSTOMER_INFO_RONY.CUSTOMER_NID%TYPE,
    p_customer_name     IN CUSTOMER_INFO_RONY.CUSTOMER_NAME%TYPE,
    p_mothers_name      IN CUSTOMER_INFO_RONY.MOTHERS_NAME%TYPE,
    p_fathers_name      IN CUSTOMER_INFO_RONY.FATHERS_NAME%TYPE,
    p_spouse_name       IN CUSTOMER_INFO_RONY.SPOUSE_NAME%TYPE,
    p_gender           IN CUSTOMER_INFO_RONY.GENDER%TYPE,
    p_date_of_birth    IN CUSTOMER_INFO_RONY.DATE_OF_BIRTH%TYPE,
    p_marital_status   IN CUSTOMER_INFO_RONY.MARITAL_ST%TYPE,
    p_customer_id   out CUSTOMER_INFO_RONY.CUSTOMER_ID%TYPE,
    p_make_by       IN CUSTOMER_INFO_RONY.MADE_BY%TYPE,
    perror_code    OUT NVARCHAR2,
    perror_message OUT NVARCHAR2
  );
   
  PROCEDURE INSERT_INTRODUCER_INFO(p_intro_type  IN INTRODUCER_INFO_RONY.INTRO_TYPE%TYPE,
                               p_intro_branch    IN INTRODUCER_INFO_RONY.INTRO_ACCOUNT_BRANCH%TYPE,
                               p_intro_acc_no    IN INTRODUCER_INFO_RONY.INTRO_ACCOUNT_NUMBER%TYPE,
                               p_intro_details   IN INTRODUCER_INFO_RONY.INTRO_DETAILS%TYPE,
                               p_customer_ID     IN INTRODUCER_INFO_RONY.CUSTOMER_ID%TYPE,
                               p_intro_pa_no     IN INTRODUCER_INFO_RONY.INTRO_PA_NO%TYPE,
                               p_intro_employee_id IN INTRODUCER_INFO_RONY.INTRO_EMPLOYEE_ID%TYPE,
                               p_make_by         IN INTRODUCER_INFO_RONY.MAKE_BY%TYPE,
                               p_intro_id    OUT INTRODUCER_INFO_RONY.INTRO_ID%TYPE,
                               perror_code      OUT NVARCHAR2,
                               perror_message   OUT NVARCHAR2 );
                               
                               
  PROCEDURE GET_CUSTOMER_BY_ID( p_customer_id IN CUSTOMER_INFO_RONY.CUSTOMER_ID%TYPE,
                                presult_cur OUT SYS_REFCURSOR,
                                perror_code OUT NVARCHAR2,
                                perror_message OUT NVARCHAR2);       
                                
  PROCEDURE GET_INTRODUCER_BY_ID( p_customer_id IN CUSTOMER_INFO_RONY.CUSTOMER_ID%TYPE,
                                presult_cur OUT SYS_REFCURSOR,
                                perror_code OUT NVARCHAR2,
                                perror_message OUT NVARCHAR2); 
  PROCEDURE INSERT_ADDRESS_INFO(paddress_id OUT ADDRESS_LIST_RONY.ADDRESS_ID%TYPE,
                                paddress_type_nm IN ADDRESS_LIST_RONY.ADDRESS_TYPE_NM%TYPE,
                                paddress_type_id IN ADDRESS_LIST_RONY.ADDRESS_TYPE_ID%TYPE,
                                paddress_details IN ADDRESS_LIST_RONY.ADDRESS_DETAILS%TYPE,
                                pcity IN ADDRESS_LIST_RONY.CITY%TYPE,
                                pzip_code IN ADDRESS_LIST_RONY.ZIP_CODE%TYPE,
                                pphone_no IN ADDRESS_LIST_RONY.PHONE_NO%TYPE,
                                pmobile_no IN ADDRESS_LIST_RONY.MOBILE_NO%TYPE,
                                pemail IN ADDRESS_LIST_RONY.EMAIL%TYPE,
                                pcountry_id IN ADDRESS_LIST_RONY.COUNTRY_ID%TYPE,
                                pdistrict_id IN ADDRESS_LIST_RONY.DISTRICT_ID%TYPE,
                                pdivision_id IN ADDRESS_LIST_RONY.DIVISION_ID%TYPE,
                                pthana_id IN ADDRESS_LIST_RONY.THANA_ID%TYPE,
                                pcustomer_id IN ADDRESS_LIST_RONY.CUSTOMER_ID%TYPE,
                                pmade_by IN ADDRESS_LIST_RONY.MAKE_BY%TYPE,
                                perror_code OUT NVARCHAR2,
                                perror_message OUT NVARCHAR2);
  PROCEDURE GET_ALL_COUNTRIES(presult_cur OUT SYS_REFCURSOR);
  
  PROCEDURE GET_DIVISIONS(pcountry_id     IN NVARCHAR2,
                          presult_cur OUT SYS_REFCURSOR);
  
  PROCEDURE GET_DISTRICTS(pdivision_id    IN NVARCHAR2,
                          presult_cur OUT SYS_REFCURSOR);
  PROCEDURE GET_THANAS(pdistrict_id    IN NVARCHAR2,
                       presult_cur OUT SYS_REFCURSOR);     
  PROCEDURE GET_ADDRESS_BY_ID( p_customer_id IN address_list_rony.CUSTOMER_ID%TYPE,
                                presult_cur OUT SYS_REFCURSOR,
                                perror_code OUT NVARCHAR2,
                                perror_message OUT NVARCHAR2);                 
END CUSTOMER_INFO_HANDLER;
/
CREATE OR REPLACE PACKAGE BODY CUSTOMER_INFO_HANDLER AS

--=========================INSERT CUSTOMER INFO==============================
  PROCEDURE INSERT_CUSTOMER_INFO(
    p_customer_nid      IN CUSTOMER_INFO_RONY.CUSTOMER_NID%TYPE,
    p_customer_name     IN CUSTOMER_INFO_RONY.CUSTOMER_NAME%TYPE,
    p_mothers_name      IN CUSTOMER_INFO_RONY.MOTHERS_NAME%TYPE,
    p_fathers_name      IN CUSTOMER_INFO_RONY.FATHERS_NAME%TYPE,
    p_spouse_name       IN CUSTOMER_INFO_RONY.SPOUSE_NAME%TYPE,
    p_gender           IN CUSTOMER_INFO_RONY.GENDER%TYPE,
    p_date_of_birth    IN CUSTOMER_INFO_RONY.DATE_OF_BIRTH%TYPE,
    p_marital_status   IN CUSTOMER_INFO_RONY.MARITAL_ST%TYPE,
    p_customer_id   OUT CUSTOMER_INFO_RONY.CUSTOMER_ID%TYPE,
    p_make_by       IN CUSTOMER_INFO_RONY.MADE_BY%TYPE,
    perror_code    OUT NVARCHAR2,
    perror_message OUT NVARCHAR2
  ) 
  IS
  
  BEGIN
    SELECT lpad(nvl(max(to_number(r.CUSTOMER_ID)), 0) + 1, 10, '0')
      INTO p_customer_id
      FROM CUSTOMER_INFO_RONY r;
  
    INSERT INTO CUSTOMER_INFO_RONY (
    Customer_id,
      CUSTOMER_NID,
      CUSTOMER_NAME,
      MOTHERS_NAME,
      FATHERS_NAME,
      SPOUSE_NAME,
      GENDER,
      DATE_OF_BIRTH,
      MARITAL_ST,
      MAKE_DATE,
      AUTH_STATUS_ID,
      last_action,
      MADE_BY
    ) VALUES (
    p_customer_id,
      p_customer_nid,
      p_customer_name,
      p_mothers_name,
      p_fathers_name,
      p_spouse_name,
      p_gender,
      p_date_of_birth,
      p_marital_status,
      SYSTIMESTAMP,
      'U',
       'ADD',
       p_make_by
    );
    
    EXCEPTION
    WHEN OTHERS THEN
      perror_code    := SQLCODE;
      perror_message := SQLERRM;
  END INSERT_CUSTOMER_INFO;

---=================================INSERT INTRODUCER INFO======================================
PROCEDURE INSERT_INTRODUCER_INFO(p_intro_type  IN INTRODUCER_INFO_RONY.INTRO_TYPE%TYPE,
                               p_intro_branch    IN INTRODUCER_INFO_RONY.INTRO_ACCOUNT_BRANCH%TYPE,
                               p_intro_acc_no    IN INTRODUCER_INFO_RONY.INTRO_ACCOUNT_NUMBER%TYPE,
                               p_intro_details   IN INTRODUCER_INFO_RONY.INTRO_DETAILS%TYPE,
                               p_customer_ID     IN INTRODUCER_INFO_RONY.CUSTOMER_ID%TYPE,
                               p_intro_pa_no     IN INTRODUCER_INFO_RONY.INTRO_PA_NO%TYPE,
                               p_intro_employee_id IN INTRODUCER_INFO_RONY.INTRO_EMPLOYEE_ID%TYPE,
                               p_make_by         IN INTRODUCER_INFO_RONY.MAKE_BY%TYPE,
                               p_intro_id    OUT INTRODUCER_INFO_RONY.INTRO_ID%TYPE,
                               perror_code      OUT NVARCHAR2,
                               perror_message   OUT NVARCHAR2 ) IS
  BEGIN
     SELECT lpad(nvl(max(to_number(r.INTRO_ID)), 0) + 1, 10, '0')
    INTO p_intro_id
    FROM INTRODUCER_INFO_RONY r;
    
    
    INSERT INTO INTRODUCER_INFO_RONY(
    INTRO_TYPE,
    INTRO_ACCOUNT_BRANCH,
    INTRO_ACCOUNT_NUMBER,
    INTRO_PA_NO,
    INTRO_EMPLOYEE_ID,
    INTRO_DETAILS,
    CUSTOMER_ID,
    MAKE_DATE,
    AUTH_STATUS_ID,
    LAST_ACTION,
    MAKE_BY,
    INTRO_ID
    )
    VALUES(
    p_intro_type,
    case 
      when p_intro_type =1 then null
      else p_intro_branch
    end,
    case 
      when p_intro_type =1 then null
      else p_intro_acc_no
    end,
    case 
      when p_intro_type =2 then null
      else p_intro_pa_no
    end,
    case 
      when p_intro_type =2 then null
      else p_intro_employee_id
    end,
    p_intro_details,
    p_customer_ID,
    SYSDATE,
    'U',
    'ADD',
     p_make_by,
     p_intro_id
 );
   EXCEPTION
    WHEN OTHERS THEN
      perror_code    := SQLCODE;
      perror_message := SQLERRM;

  END INSERT_INTRODUCER_INFO;

--=================================INSERT ADDRESS INFO==========================================
PROCEDURE INSERT_ADDRESS_INFO(paddress_id OUT ADDRESS_LIST_RONY.ADDRESS_ID%TYPE,
                              paddress_type_nm IN ADDRESS_LIST_RONY.ADDRESS_TYPE_NM%TYPE,
                              paddress_type_id IN ADDRESS_LIST_RONY.ADDRESS_TYPE_ID%TYPE,
                              paddress_details IN ADDRESS_LIST_RONY.ADDRESS_DETAILS%TYPE,
                              pcity IN ADDRESS_LIST_RONY.CITY%TYPE,
                              pzip_code IN ADDRESS_LIST_RONY.ZIP_CODE%TYPE,
                              pphone_no IN ADDRESS_LIST_RONY.PHONE_NO%TYPE,
                              pmobile_no IN ADDRESS_LIST_RONY.MOBILE_NO%TYPE,
                              pemail IN ADDRESS_LIST_RONY.EMAIL%TYPE,
                              pcountry_id IN ADDRESS_LIST_RONY.COUNTRY_ID%TYPE,
                              pdistrict_id IN ADDRESS_LIST_RONY.DISTRICT_ID%TYPE,
                              pdivision_id IN ADDRESS_LIST_RONY.DIVISION_ID%TYPE,
                              pthana_id IN ADDRESS_LIST_RONY.THANA_ID%TYPE,
                              pcustomer_id IN ADDRESS_LIST_RONY.CUSTOMER_ID%TYPE,
                              pmade_by IN ADDRESS_LIST_RONY.MAKE_BY%TYPE,
                              perror_code OUT NVARCHAR2,
                              perror_message OUT NVARCHAR2) IS
                                
BEGIN 
  SELECT lpad(nvl(max(to_number(r.ADDRESS_ID)), 0) + 1, 10, '0')
      INTO paddress_id
      FROM ADDRESS_LIST_RONY r;
      
  INSERT INTO ADDRESS_LIST_RONY
  (ADDRESS_ID,
   ADDRESS_TYPE_NM,
   ADDRESS_TYPE_ID,
   ADDRESS_DETAILS,
   CITY,
   ZIP_CODE,
   COUNTRY_ID,
   DIVISION_ID,
   DISTRICT_ID,
   THANA_ID,
   PHONE_NO,
   MOBILE_NO,
   EMAIL,
   CUSTOMER_ID,
   AUTH_STATUS_ID,
   MAKE_BY,
   MAKE_DATE,
   LAST_ACTION)
   VALUES(paddress_id,
    paddress_type_nm,
    paddress_type_id,
    paddress_details,
    pcity,
    pzip_code,
    pcountry_id,
    pdivision_id,
    pdistrict_id,
    pthana_id,
    pphone_no,
    pmobile_no,
    pemail,
    pcustomer_id,
    'U',
    pmade_by,
    SYSDATE,
    'ADD');
   EXCEPTION
    WHEN OTHERS THEN
      perror_code    := SQLCODE;
      perror_message := SQLERRM;    
END INSERT_ADDRESS_INFO;

--===================================GET CUSTOMER BY ID=====================================

PROCEDURE GET_CUSTOMER_BY_ID( p_customer_id IN CUSTOMER_INFO_RONY.CUSTOMER_ID%TYPE,
                                presult_cur OUT SYS_REFCURSOR,
                                perror_code OUT NVARCHAR2,
                                perror_message OUT NVARCHAR2)IS
BEGIN
                             
     OPEN presult_cur FOR
      select r.customer_id,
             r.customer_nid,
             r.customer_name,
             r.mothers_name,
             r.fathers_name,
             r.spouse_name,
             case
               when r.gender = 1 then 'Male'
               when r.gender = 2 then 'Female'
               else 'Others'
              end as gender,
             r.date_of_birth,
             case 
               when r.marital_st = 1 then 'Married'
               when r.marital_st = 2 then 'Single'
               when r.marital_st = 3 then 'Divorced'
               else 'Widow'
              end marital_st
        from CUSTOMER_INFO_RONY r
       where r.CUSTOMER_ID = p_customer_id;
  
  EXCEPTION
    WHEN OTHERS THEN
      perror_code    := SQLCODE;
      perror_message := SQLERRM;

END  GET_CUSTOMER_BY_ID; 

--==================================GET INTRODUCER BY ID==================================

PROCEDURE GET_INTRODUCER_BY_ID( p_customer_id IN CUSTOMER_INFO_RONY.CUSTOMER_ID%TYPE,
                                presult_cur OUT SYS_REFCURSOR,
                                perror_code OUT NVARCHAR2,
                                perror_message OUT NVARCHAR2)IS
BEGIN
  OPEN presult_cur for 
  SELECT I.INTRO_ID,
       I.INTRO_TYPE,
       I.INTRO_ACCOUNT_BRANCH,
       I.INTRO_ACCOUNT_NUMBER,
       I.INTRO_DETAILS,
       I.INTRO_EMPLOYEE_ID,
       I.INTRO_PA_NO                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            



                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  FROM INTRODUCER_INFO_RONY I
  WHERE I.CUSTOMER_ID = p_customer_id;
  EXCEPTION
    WHEN OTHERS THEN
      perror_code    := SQLCODE;
      perror_message := SQLERRM;
END  GET_INTRODUCER_BY_ID;                             

--==================================GET ADDRESS BY ID=====================================
PROCEDURE GET_ADDRESS_BY_ID(p_customer_id IN address_list_rony.CUSTOMER_ID%TYPE,
                            presult_cur OUT SYS_REFCURSOR,
                            perror_code OUT NVARCHAR2,
                            perror_message OUT NVARCHAR2)IS
BEGIN 
  OPEN presult_cur for
       SELECT A.ADDRESS_ID,
             A.ADDRESS_TYPE_NM,
             A.ADDRESS_TYPE_ID,
             A.ADDRESS_DETAILS,
             A.CITY,
             A.COUNTRY_ID,
             A.DIVISION_ID,
             A.DISTRICT_ID,
             A.THANA_ID,
             C.COUNTRY_NM,
             D.DIVISION_NM,
             DR.DISTRICT_NM,
             T.THANA_NM,
             A.ZIP_CODE,
             A.PHONE_NO,
             A.MOBILE_NO,
             A.EMAIL 
       FROM ADDRESS_LIST_RONY A
            left join COUNTRY2 C on a.country_id=c.country_id
            left join DIVISION2 D on A.DIVISION_ID = D.DIVISION_ID
            left join DISTRICT2 DR on A.DISTRICT_ID = DR.DISTRICT_ID
            left join THANA2 T on A.THANA_ID = T.THANA_ID
        WHERE  A.CUSTOMER_ID= p_customer_id;
  
  EXCEPTION
    WHEN OTHERS THEN
      perror_code    := SQLCODE;
      perror_message := SQLERRM;
END GET_ADDRESS_BY_ID;

--==================================GET COUNTRIES=========================================
PROCEDURE GET_ALL_COUNTRIES(presult_cur OUT SYS_REFCURSOR) IS
  BEGIN
    OPEN presult_cur FOR
      SELECT a.country_id, a.country_nm 
        FROM country2 a
       WHERE a.auth_status_id = 'A'
        
         AND a.nationality_nm IS NOT NULL
       ORDER BY a.nationality_nm;
  
END GET_ALL_COUNTRIES;

--=====================================GET DIVISIONS==========================================
PROCEDURE GET_DIVISIONS(pcountry_id     IN NVARCHAR2,
                        presult_cur OUT SYS_REFCURSOR) IS
   
  BEGIN
    OPEN presult_cur FOR
      SELECT a.division_id, a.division_nm , a.country_id, b.country_nm 
        FROM division2 a, country2 b
       WHERE a.auth_status_id = 'A'
         AND a.country_id = b.country_id
         AND a.country_id = pcountry_id
       ORDER BY a.division_nm;
  
  END GET_DIVISIONS;
  
--====================================GET DISTRICTS===========================================
PROCEDURE GET_DISTRICTS(pdivision_id    IN NVARCHAR2,
                        presult_cur OUT SYS_REFCURSOR) IS
   
  BEGIN
    OPEN presult_cur FOR
      SELECT a.district_id, a.district_nm 
        FROM district2 a
       WHERE a.auth_status_id = 'A'
         AND a.division_id = pdivision_id
       ORDER BY a.district_nm;
  
END GET_DISTRICTS;

--========================================GET THANAS============================================
PROCEDURE GET_THANAS(pdistrict_id    IN NVARCHAR2,
                     presult_cur OUT SYS_REFCURSOR) IS
  
  BEGIN
    OPEN presult_cur FOR
      SELECT a.thana_id, a.thana_nm 
        FROM thana2 a
       WHERE a.auth_status_id = 'A'
         AND a.district_id = pdistrict_id
       ORDER BY a.thana_nm;
  
END GET_THANAS;


END CUSTOMER_INFO_HANDLER;
/
