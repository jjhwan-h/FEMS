
        let warn={};

        extinguishers=JSON.parse(extinguishers.replace(/&#34;/g, '"'));
        console.log(extinguishers.length);
        if(extinguishers && extinguishers.length>0){
            const center = extinguishers[0];
            var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
            center : new kakao.maps.LatLng(center.latitude, center.longitude), // 지도의 중심좌표
            level : 5 // 지도의 확대 레벨
            });
            extinguishers.forEach((el)=>{
            const markerPosition = new kakao.maps.LatLng(el.latitude,el.longitude);
            const marker = new kakao.maps.Marker({
                position:markerPosition,
                clickable:true,
                title:`${el.id}`,
            });
            marker.setMap(map);

            if(el.state!='안전'){
                    warn[el.id]=[el.img,el.name];
                    console.log(warn)
                }

            kakao.maps.event.addListener(marker, 'click', ()=>{
                $('#image').attr("src",`${el.img}`);
                $('#extinguisher-id').html(`소화기#${el.id}`);
                $('#state').remove();
                let stateSpan = $("<span id='state'></span>");
                stateSpan.addClass('badge rounded-pill');
                stateSpan.html(`${el.state}`);
                if(el.state==="안전"){
                    stateSpan.addClass('bg-success');
                }
                else{
                    stateSpan.addClass('bg-warning');
                }
                $('#extinguisher-header').append(stateSpan);
                $('#desc').val(`${el.desc}`);
                $('#humidity').css("width",`${el.humidity}`);
                $('#humidity').html(`${el.humidity}%`);
                $('#temp').css("width",`${el.temp}`);
                $('#temp').html(`${el.temp}°C`);
                $('#press').css("width",`${el.press}`);
                $('#press').html(`${el.press}㎏/㎠`);
                $('#manufacturer').val(`${el.manufacturer}`);
                $('#name').val(`${el.name}`);
                $('#latitude').val(`${el.latitude}`);
                $('#longitude').val(`${el.longitude}`);
                $('#date').html(`${el.date}`);

                $("#modify").click(()=>{
                    $('.form-control').prop('disabled',false);
                    $('<input>').attr({
                    type: 'hidden',
                    name: 'extinguisher-id',
                    value: el.id
                }).appendTo('#update-form');
                    $('#modify').text('제출');
                    $('#modify').attr("type","submit");
                }); 
                $("#update-form").submit(()=>{
                    event.preventDefault(); // Prevent the default form submission
                    let formData = $("#update-form").serializeArray();
                    //console.log(JSON.stringify(formData));
                    let object={};
                    formData.forEach((el)=>{
                        object[el.name] = el.value;
                    });
                    
                    $.ajax({
                        url: '/extinguishers', // PATCH 요청을 보낼 엔드포인트 URL
                        type: 'PATCH',
                        contentType: 'application/json',
                        data: JSON.stringify(object),
                        success: function(response, status, xhr) {
                            console.log(response); // 서버에서 반환한 응답 확인
                            window.location.href=response.url;
                        },
                        error: function(xhr, status, error) {
                        console.error(xhr.responseText); // 에러 메시지 표시
                        }
                    });
                });
                $("#delete").click(()=>{
                    event.preventDefault(); // Prevent the default form submission
                    let object = {
                        id:$("#extinguisher-id").text()
                    }
                    console.log(object)
                    $.ajax({
                        url: '/extinguishers', // PATCH 요청을 보낼 엔드포인트 URL
                        type: 'DELETE',
                        contentType: 'application/json',
                        data: JSON.stringify(object),
                        success: function(response) {
                            console.log(response); // 서버에서 반환한 응답 확인
                            window.location.href=response.url;
                        },
                        error: function(xhr, status, error) {
                            
                            console.error(xhr.responseText); // 에러 메시지 표시
                        }
                    });
                });

                // if(el.state!='안전'){
                //     $('#toast-img').attr("src",`${el.img}`);
                //     $('#toast-extinguisher-id').val(`소화기#${el.id}`);
                //     $('#toast-name').val(`${el.name}`);
                //     $('.toast').toast('show');
                // }

                $('.offcanvas').offcanvas('show');
                });
            })
            } 
            else{
                var map = new kakao.maps.Map(document.getElementById('map'), { // 지도를 표시할 div
                center : new kakao.maps.LatLng("33.449431", "126.570504"), // 지도의 중심좌표
                level : 7 // 지도의 확대 레벨
            });
        }

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        
        window.addEventListener('load', function() {
            console.log('All resources finished loading!');
            for (let key in warn) {
                if (warn.hasOwnProperty(key)) {
                    $('#toast-img').attr("src",`${warn[key][0]}`);
                    $('#toast-extinguisher-id').val(`소화기#${key}`);
                    $('#toast-name').val(`${warn[key][1]}`);
                    $('.toast').toast('show');
                }
            }
        });
