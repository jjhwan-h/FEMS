    /* ====================== *
    *  Toggle Between        *
    *  Sign Up / Login       *
    * ====================== */
    $(document).ready(function(){
    $('#goRight').on('click', function(e){
        $('#slideBox').animate({
            'marginLeft' : '0'
            });
            $('.topLayer').animate({
                'marginLeft' : '100%'
            });
            e.preventDefault();
        });
        $('#goLeft').on('click', function(){
            if (window.innerWidth > 769){
            $('#slideBox').animate({
                'marginLeft' : '50%'
            });
            }
            else {
            $('#slideBox').animate({
                'marginLeft' : '20%'
            });
            }
            $('.topLayer').animate({
            'marginLeft': '0'
            });
        });
        });

        /* ====================== *
        *  Initiate Canvas       *
        * ====================== */
        paper.install(window);
        paper.setup(document.getElementById("canvas"));
        var raster = new Raster('https://storage.googleapis.com/extinguisher-storage/fire-extinguisher-712975_1280-min.jpg');
        var raster2 = new Raster('https://storage.googleapis.com/extinguisher-storage/fire-extinguisher-712975_1280-min.jpg');
        // 배경 이미지를 화면에 맞춰서 크기 조절
        canvasWidth = view.size.width;
        canvasHeight = view.size.height;
       // 첫 번째 이미지
        raster.fitBounds(new Rectangle(0, 0, canvasWidth / 2, canvasHeight*3));
        raster.position = new Point(canvasWidth * (1/4), canvasHeight / 2);

        // 두 번째 이미지
        raster2.fitBounds(new Rectangle(0, 0, canvasWidth / 2, canvasHeight*3));
        raster2.position = new Point(canvasWidth * (3/4), canvasHeight / 2);
        // 화면 크기가 변경될 때마다 배경 이미지 크기 조절
        function onResize(event) {
            raster.fitBounds(view.bounds);
        }
        // 화면 크기가 변경될 때마다 onResize 함수 호출
        view.onResize = onResize;
        // View를 업데이트하여 화면 크기에 따라 새로운 배경 이미지 크기로 조절
        view.draw();
        // Paper JS Variables
        var canvasWidth, 
            canvasHeight,
            canvasMiddleX,
            canvasMiddleY;

        var shapeGroup = new Group();

        var positionArray = [];

        function getCanvasBounds() {
        // Get current canvas size
        canvasWidth = view.size.width/2.3;
        canvasHeight = view.size.height;
        canvasMiddleX = canvasWidth / 2;
        canvasMiddleY = canvasHeight / 2;
        // Set path position
        var position1 = {
            x: (canvasMiddleX / 2) + 10,
            y: canvasMiddleY+20, 
        };

        var position2 = {
            x: 15,
            y: canvasMiddleY, 
        };

        var position3 = {
            x: (canvasMiddleX - 50) + (canvasMiddleX / 2),
            y: 10, 
        };

        var position4 = {
            x: 0,
            y: canvasMiddleY + 30, 
        };

        var position5 = {
            x: canvasWidth - 20,
            y: canvasHeight - 5, 
        };

        var position6 = {
            x: canvasMiddleX + 45,
            y: canvasHeight - 30, 
        };
        
        var position7 = {
            x: canvasWidth + 10,
            y: canvasMiddleY - 15, 
        };
        
        var position8 = {
            x: canvasMiddleX + 25,
            y: canvasMiddleY + 25, 
        };

        positionArray = [position3, position2, position5, position4, position1, position6, position7, position8];
        };


        /* ====================== *
        * Create Shapes          *
        * ====================== */
        function initializeShapes() {
        // Get Canvas Bounds
        getCanvasBounds();

        var shapePathData = [
            "m5368 1471l-263 177c-51 97-170 167-334 467-230 417-192 797-316 1042-92 182-253 318-401 283-135-301 105-536 160-738-701 252-539 990-696 1761-39 194-219 486-413 302-225-251 181-988 243-1122-779 124-555 1887-1144 1786-363-63-137-645-137-646l294-185c-240-210-626 128-776 427-421 838-51 1445 354 1982 247 328 417 640 214 1021-416 328-565-512-654-952-100 206-151 701-140 998 91 1005 359 1301 703 1240h1c76-14 156-44 238-89 518-90 1355 214 1955-193 544-370 910-1639 548-2363 12 260 21 478-158 631-230-87-224-405-154-592 188-499 1235-775 982-1618-88 129-26 27-60 113-275 704-717 173-324-259 328-361 1104-152 1144-893-177 107-306 321-427-7 68-324 379-384 598-323 204 57 356 172 617 153 746-52 415-735 1136-955-113-219-422 32-546 124-194 145-430 248-525-35 121-542 764-505 1017-425 505 161 563 176 1027-405l-6-16c-675 351-789-154-1274-192 56-64 119-140 193-232l-6-16c-712 371-800-210-1356-193-221 7-563 131-769 351-185 200-249 614-559 488l-77-183c109-423 108-461 543-709-179-117-269 5-452-5z",
            "m6355 2072l-241 108c-58 82-165 122-353 373-261 349-305 727-451 935-107 154-260 247-369 177-47-325 187-495 270-678-599 75-616 831-889 1540-69 179-267 419-383 194-127-299 335-915 409-1030-634-68-803 1696-1245 1455-272-148 19-659 19-659l267-109c-147-261-515-27-691 227-494 711-323 1390-110 2009 129 377 201 722-32 1042-390 218-342-633-327-1082-118 175-255 643-304 935-352 2079 1765 2304 1973 327 70-591 385-707 234-1546-41 254-77 468-247 573-163-140-96-447-5-611 245-439 1119-453 1085-1332-94 103-26 20-69 95-353 616-596-6-203-330 328-271 895 120 1071-590-160 62-303 238-334-110 117-297 372-280 532-168 148 105 245 253 453 298 595 130 469-613 1077-652-46-240-337-71-452-11-181 93-385 136-405-162 201-497 698-305 880-166 364 279 406 307 884-145l-2-16c-630 187-585-398-1024-516-175-47-466-10-671 155-184 148-315 535-533 338l-25-197c168-384 175-421 564-556-117-157-211-60-353-115z",
            "m5368 1471l-263 177c-51 97-170 167-334 467-230 417-192 797-316 1042-92 182-253 318-401 283-135-301 105-536 160-738-701 252-539 990-696 1761-39 194-219 486-413 302-225-251 181-988 243-1122-779 124-555 1887-1144 1786-363-63-137-645-137-646l294-185c-240-210-626 128-776 427-421 838-51 1445 354 1982 247 328 417 640 214 1021-416 328-565-512-654-952-100 206-151 701-140 998 91 1005 359 1301 703 1240h1c76-14 156-44 238-89 518-90 1355 214 1955-193 544-370 910-1639 548-2363 12 260 21 478-158 631-230-87-224-405-154-592 188-499 1235-775 982-1618-88 129-26 27-60 113-275 704-717 173-324-259 328-361 1104-152 1144-893-177 107-306 321-427-7 68-324 379-384 598-323 204 57 356 172 617 153 746-52 415-735 1136-955-113-219-422 32-546 124-194 145-430 248-525-35 121-542 764-505 1017-425 505 161 563 176 1027-405l-6-16c-675 351-789-154-1274-192 56-64 119-140 193-232l-6-16c-712 371-800-210-1356-193-221 7-563 131-769 351-185 200-249 614-559 488l-77-183c109-423 108-461 543-709-179-117-269 5-452-5z",
            "m6355 2072l-241 108c-58 82-165 122-353 373-261 349-305 727-451 935-107 154-260 247-369 177-47-325 187-495 270-678-599 75-616 831-889 1540-69 179-267 419-383 194-127-299 335-915 409-1030-634-68-803 1696-1245 1455-272-148 19-659 19-659l267-109c-147-261-515-27-691 227-494 711-323 1390-110 2009 129 377 201 722-32 1042-390 218-342-633-327-1082-118 175-255 643-304 935-352 2079 1765 2304 1973 327 70-591 385-707 234-1546-41 254-77 468-247 573-163-140-96-447-5-611 245-439 1119-453 1085-1332-94 103-26 20-69 95-353 616-596-6-203-330 328-271 895 120 1071-590-160 62-303 238-334-110 117-297 372-280 532-168 148 105 245 253 453 298 595 130 469-613 1077-652-46-240-337-71-452-11-181 93-385 136-405-162 201-497 698-305 880-166 364 279 406 307 884-145l-2-16c-630 187-585-398-1024-516-175-47-466-10-671 155-184 148-315 535-533 338l-25-197c168-384 175-421 564-556-117-157-211-60-353-115z",
            "m5368 1471l-263 177c-51 97-170 167-334 467-230 417-192 797-316 1042-92 182-253 318-401 283-135-301 105-536 160-738-701 252-539 990-696 1761-39 194-219 486-413 302-225-251 181-988 243-1122-779 124-555 1887-1144 1786-363-63-137-645-137-646l294-185c-240-210-626 128-776 427-421 838-51 1445 354 1982 247 328 417 640 214 1021-416 328-565-512-654-952-100 206-151 701-140 998 91 1005 359 1301 703 1240h1c76-14 156-44 238-89 518-90 1355 214 1955-193 544-370 910-1639 548-2363 12 260 21 478-158 631-230-87-224-405-154-592 188-499 1235-775 982-1618-88 129-26 27-60 113-275 704-717 173-324-259 328-361 1104-152 1144-893-177 107-306 321-427-7 68-324 379-384 598-323 204 57 356 172 617 153 746-52 415-735 1136-955-113-219-422 32-546 124-194 145-430 248-525-35 121-542 764-505 1017-425 505 161 563 176 1027-405l-6-16c-675 351-789-154-1274-192 56-64 119-140 193-232l-6-16c-712 371-800-210-1356-193-221 7-563 131-769 351-185 200-249 614-559 488l-77-183c109-423 108-461 543-709-179-117-269 5-452-5z",
        ];

        
        for (var i = 0; i <= shapePathData.length; i++) {
            // Create shape
            var headerShape;
            if(i%2===0){
                headerShape = new Path({
                fillColor: 'rgba(255, 0, 0, 0.6)',
                strokeColor: 'rgba(255, 0,0 , 1.0)',
                strokeWidth: 2,
                parent: shapeGroup,
                });
            }else{
                headerShape = new Path({
                fillColor: 'rgba(255, 255,0, 0.6)',
                strokeColor: 'rgba(255, 255,0 , 1.0)',
                strokeWidth: 2,
                parent: shapeGroup,
                });
            }
            
            // Set path data
            headerShape.pathData = shapePathData[i];
            headerShape.scale(0.2);
            // Set path position
            headerShape.position = positionArray[i];
        }
        };

        initializeShapes();

        /* ====================== *
        * Animation              *
        * ====================== */
        view.onFrame = function paperOnFrame(event) {
        if (event.count % 4 === 0) {
            // Slows down frame rate
            for (var i = 0; i < shapeGroup.children.length; i++) {
            if (i % 2 === 0) {
                shapeGroup.children[i].rotate(-0.1);
            } else {
                shapeGroup.children[i].rotate(0.1);
            }
            }
        }
        };

        view.onResize = function paperOnResize() {
        getCanvasBounds();

        for (var i = 0; i < shapeGroup.children.length; i++) {
            shapeGroup.children[i].position = positionArray[i];
        }

        if (canvasWidth < 700) {
            shapeGroup.children[3].opacity = 0;
            shapeGroup.children[2].opacity = 0;
            shapeGroup.children[5].opacity = 0;
        } else {
            shapeGroup.children[3].opacity = 1;
            shapeGroup.children[2].opacity = 1;
            shapeGroup.children[5].opacity = 1;
        }
        };  
