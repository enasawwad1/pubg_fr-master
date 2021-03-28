<template>
  <div class="login-page">
    <div class="form">
      <span class="incorrectUserPass" v-if="IncorrectUserOrPass">Incorrect username or password</span>
      <form class="login-form" v-if="login_flag">
        <input v-model="login_form.username" type="text" placeholder="username">
        <input v-model="login_form.password" type="password" placeholder="password">
        <button style="background-color:#521e69 !important" @click.prevent="login()">login</button>
        <p class="message">
          Not registered?
          <a
            @click="switchToSignIn()"
            style="color:rgb(82, 30, 105) !important"
          >Create an account</a>
        </p>
        <p class="message">
          <a
            @click="forget_email_flag = true"
            style="color:rgb(82, 30, 105) !important"
          >Forgot Password?</a>
        </p>
      </form>

      <form class="register-form" v-else>
        <span class="incorrectUserPass" v-if="missing_field">please fill all fields.</span>
        <span class="incorrectUserPass" v-if="email_not_valid">Invalid email address.</span>
        <span
          class="incorrectUserPass"
          v-if="confirm_not_correct"
        >the confirm password not match the password.</span>

        <input v-model="register_form.name" type="text" placeholder="full name">
        <input v-model="register_form.username" type="text" placeholder="username">
        <input v-model="register_form.password" type="password" placeholder="password">
        <input v-model="confirm_password" type="password" placeholder="confirm password">
        <input v-model="register_form.email" type="text" placeholder="E-mail">
        <input v-model="register_form.address" type="text" placeholder="address">
        <input v-model="register_form.phone" type="number" placeholder="Ex: +970XXXXXXXXX">
        <div class="gender">
          <input
            v-model="register_form.gender"
            type="radio"
            name="gender"
            id="Male"
            value="Male"
            checked
          >
          <label class="label-gender" for="Male">Male</label>
          <input
            v-model="register_form.gender"
            type="radio"
            name="gender"
            id="Female"
            value="Female"
          >
          <label class="label-gender" for="Female">Female</label>
        </div>
        <!-- <button @click.prevent="createNewUser()">create</button> -->

        <button style="background-color:#521e69 !important" @click.prevent="createNewUser()">
          <template v-if="!createNewUserFlag">
            <i class="fas fa-spin fa-spinner"></i>
            Please Wait ...
          </template>
          <template v-else>Register</template>
        </button>
        <span
          style="background: white !important;"
          class="success"
          v-if="success_cat"
        >Created Successfully</span>
        <span
          style="background: white !important;"
          class="success"
          v-if="user_exists"
        >this email is already used</span>

        <p class="message" style="color:rgb(82, 30, 105) !important">
          Already registered?
          <a @click="switchToSignIn()" style="color:#521e69 !important">Sign In</a>
        </p>
        <p class="policy">
          By clicking Register you agree to our
          <span
            @click="showPolicyModal"
            class="terms"
          >terms data policy.</span>
        </p>
      </form>

      <v-row justify="center">
        <v-dialog v-model="policy_modal" max-width="700">
          <v-card>
            <v-card-title class="headline" style="margin: 0 0px 0 25%;">Website Policy and Terms</v-card-title>
            <!--  <div style="margin: 0 0 15px 21px;">
              <span @click="en_flag=true" class="lang">English</span>
              <span @click="en_flag=false" class="lang">Arabic</span>
            </div>-->
            <v-card-text v-if="false">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Eius ullam eum nostrum praesentium ea dolor porro officiis quaerat delectus voluptatum,
              perspiciatis eveniet magni, commodi consectetur, suscipit veniam totam consequuntur doloribus.
            </v-card-text>

            <v-card-text style="direction: rtl;" v-else>
              <p dir="RTL">
                <strong>شروط الخدمة</strong>
                <strong>.</strong>
                <br>
                <br>من خلال تسجيل حساب في HTHA STORE والوصول إلى أي من البوابات، فإنك تقر
                وتوافق على أن استخدامك للبوابات (أو أي منها) سيخضع لشروط الخدمة هذه وأي
                قواعد وإجراءات وبنود وشروط محددة أخرى للمنتجات أو الخدمات المقدمة وفقًا لما
                هو محدد أو حسبما يجوز تعديله بواسطة HTHA STORE في أي وقت أو من وقت لآخر
                وفقًا لتقديرها المطلق.
              </p>
              <p dir="RTL">
                <br>
                <strong>أولا: التعاريف</strong>
                <br>في شروط الخدمة هذه ، يكون للكلمات والعبارات التالية المعاني التالية، ما لم
                يقتض السياق معنى آخر:
                <br>الحساب: يعني حسابك المسجل حسب الأصول في HTHA STORE لتسهيل استخدام الخدمات
                المتاحة على البوابات.
                <br>المشتري: يعني الشخص الذي قام بشراء العناصر على البوابات.
                <br>البنود: تعني السلع والخدمات التي ذكرتها للبيع على البوابات و "البند" يعني
                أي منها.
                <br>الأطراف: تعني مجتمعة ، تعني HTHA STORE وأنت و "الطرف" أي واحد منهم.
                <br>البوابات: تعني مجتمعة ، بوابات الويب المعروفة حاليًا باسم HTHA STORE.com
                وغيرها من بوابات الويب الخاصة بـ HTHA STORE التي تديرها HTHA STORE.
                <br>الخدمات: تعني الخدمات التي تقدمها HTHA STORE على البوابات ، بما في ذلك ،
                على سبيل المثال لا الحصر ، إعادة بيع وتجارة التجزئة للألعاب عبر الإنترنت
                والبضائع ذات الصلة ، ونشر الألعاب ، والسوق عبر الإنترنت لبيع العناصر ،
                وفقًا للشروط الواردة في شروط الخدمة هذه ؛
                <br>العنصر الذي تم شراؤه: يعني البند الخاص بك المدرج في البوابات التي اشتراها
                المشتري.
                <br>شروط الخدمة: تعني "شروط الخدمة" هذه التي تحكم استخدامك للخدمات كما يجوز
                تعديلها في أي وقت ومن وقت لآخر وعندما ترى HTHA STORE وفقًا لتقديرها المطلق
                أنها ضرورية وتشمل: (1) أي قواعد ، الإجراءات أو شروط الخدمة للمنتجات أو
                الخدمات أو التسهيلات على النحو الذي تحدده HTHA STORE من وقت لآخر و (2) أي
                مستندات وتوجيهات ومراسلات واتفاقات مشار إليها في شروط الخدمة هذه وتشكل
                جزءًا منها ، مع أي تعديلات يتم إجراؤها في أي وقت أو من وقت لآخر إلى أي مما
                سبق.
                <br>
                <br>
                <strong>ثانيا: رخصة الاستخدام</strong>
                <br>نظرًا لأنك توافق على شروط الخدمة هذه ومتابعتك المستمرة وامتثالك لشروط
                الخدمة هذه ، تمنحك HTHA STORE بموجب هذا ترخيصًا غير حصري وغير قابل للتحويل
                للوصول إلى البوابات واستخدام الخدمات بناءً على الشروط ووفقًا للشروط الشروط
                المذكورة هنا.
                <br>
                <br>
              </p>
              <p dir="RTL">
                <strong>ثالثا</strong>
                <strong>: الاهلية والضمانات</strong>
                <br>1. في كل مرة تقوم فيها بالوصول إلى البوابات (أو أي منها)، فإنك تمثل وتضمن
                بشكل لا رجعة فيه ودون قيد أو شرط أن:
                <br>2. أنت فوق سن 18 عامًا. إذا كان عمرك أقل من 18 عامًا؛ فإن والديك يدركان
                ويوافقان على الوصول إلى البوابات واستخدام الخدمات.
                <br>3. معلوماتك الشخصية والوثائق المقدمة في هذا الصدد، بما في ذلك -دون حصر-
                اسمك الكامل ورقم هاتفك وعنوان المراسلة وعنوان البريد الإلكتروني؛ صحيحة
                ودقيقة، على أنه يجب عليك إخطارنا كتابيًا على الفور بأي تغييرات تطرأ على
                معلوماتك الشخصية.
                <br>4. يجب عليك الحفاظ على سرية كلمة المرور الخاصة بالحساب، لا يجوز لك في أي
                وقت وتحت أي ظرف من الظروف الكشف عن كلمة المرور الخاصة بك أو الكشف عنها
                للحساب لأي طرف غير مصرح له، ويجب عليك اتخاذ جميع الخطوات لمنع إفشاء كلمة
                المرور للحساب لأي جهة غير مصرح بها، على تحملك جميع المسؤولية القانونية على
                ّأثر افشاءك لذلك.
                <br>5. باستثناء ما تسمح به HTHA STORE لا يجوز لك بشكل مباشر أو غير مباشر،
                استخدام الخدمات لأي أغراض تجارية.
                <br>6. لا يجوز لك استخدام البوابات أو الخدمات (أو أي منها) للقيام بأي أنشطة
                احتيالية أو غير أخلاقية أو غير قانونية أو أي أنشطة قد تنتهك حقوق الملكية
                الفكرية لأطراف ثالثة.
                <br>7. لا يجوز لك استخدام أي ملكية فكرية مملوكة لـ HTHA STORE و/ أو لأي ناشرين
                مدرجين على البوابات بما في ذلك -على سبيل المثال لا الحصر- العلامات التجارية
                أو الأسماء التجارية؛ سواء كانت مسجلة أو غير مسجلة دون موافقة كتابية مسبقة
                من HTHA STORE
                <br>8. يجب ألا تكون مضطربًا أو مسيء أو مصدر إزعاج بأي شكل من الأشكال للمستخدمين
                الآخرين للبوابات أو لموظفي HTHA STORE.
                <br>9. لا يجوز لك استخدام و/أو سرق أي عملاء تم الحصول عليهم من خلال استخدام
                البوابات بشكل مباشر أو غير مباشر.
                <br>
                <br>
              </p>
              <p dir="RTL">
                <strong>رابعا:</strong>
                <strong>استخدام الخدمات</strong>
                <br>1. يتعين عليك شراء المعدات والبرامج اللازمة على نفقتك الخاصة لتوصيل
                البوابات والوصول إليها والاستخدام اللاحق للخدمات على أن تتحمل جميع الرسوم
                والأتعاب التي تفرضها أطراف ثالثة فيما يتعلق بك وبربطك بتوصيل أجهزتك
                بالبوابات الإلكترونية (أو أي منها)
                <br>2. يقع على عاتقك مسؤولية أساسية لضمان أن تكون على دراية بالإرشادات
                والإجراءات الخاصة باستخدام الخدمات التي قد تصدرها HTHA STORE من وقت لآخر،
                علما أن HTHA STORE لا تتحمل مسؤولية أي أخطاء و/أو خسائر و/أو أضرار ناتجة عن
                استخدامك للخدمات.
                <br>3. تقع على عاتقك مسؤولية تأمين معلومات حسابك، حيث يُعتبر أي إخطار أو تأكيد
                تتلقاه HTHA STORE تم إصداره بواسطة حسابك بصرف النظر عن أن هذا الإخطار أو
                التأكيد قد يكون تم إصداره من قِبل طرف ثالث -سواء كان مصرحًا له و/أو بخلاف
                ذلك لم يكن مصرح له، ستكون ملزمًا بهذا الإخطار أو التأكيد.
                <br>4. لا تتحمل HTHA STORE مسؤولية التصرف أو الإخطار المرسل من خلال حسابك على
                أن HTHA STORE غير ملزمة بالتحقيق من شخص المرسل، على أن يعتبر هذا الإخطار
                غير قابل للإلغاء وملزمًا لك عند استلامه من قِبل HTHA STORE بغض النظر عن أي
                خطأ و/أو احتيال و/أو تزوير و/أو عدم وضوح و/أو سوء فهم فيما يتعلق بشروط هذا
                الإخطار
                <br>5. أنت تقر وتوافق على أنه يجوز لـ HTHA STORE وفقًا لتقديرها المطلق رفض و/أو
                السماح لك باستخدام الخدمات دون إبداء أي سبب أو إشعار بذلك.
                <br>6. ما لم تسمح HTHA STORE كتابيًا بخلاف ذلك فإنه لا يجوز لك تحميل و/أو نشر
                و/أو إرسال بريد إلكتروني و/أو إتاحة أي أنشطة غير مصرح بها و/أو غير قانونية
                على البوابات و/أو مباشرة إلى مستخدمي البوابات الآخرين.
                <br>7. لا يجوز لك تحميل و/أو نشر و/أو إرسال بريد إلكتروني و/أو نقل و/أو بأي
                طريقة أخرى على الإطلاق إتاحة أي مواد تحتوي على فيروسات برامج و/أو أي رمز
                كمبيوتر آخر و/أو ملفات و/أو برامج مصممة لمقاطعة و/أو تدمير و/أو تقييد وظائف
                أي برنامج كمبيوتر و/أو جهاز و/أو اتصال المعدات بما في ذلك -على سبيل المثال
                لا الحصر- البوابات.
                <strong></strong>
              </p>
              <p dir="RTL">
                <strong>خامسا:</strong>
                <strong></strong>
                <strong>الدفع</strong>
                <br>
                <br>1. يمكنك الدفع مقابل الخدمات بتلك العملة المتوفرة على البوابات وفقًا لسعر
                الصرف السائد الذي تحدده HTHA STORE وفقًا لتقديرها المطلق.
                <br>2. ستكون وحدك مسؤولاً عن سداد الضرائب و/أو مبالغ اضافية مطبقة عليك -إن
                وجدت- وذلك فيما يتعلق باستخدام الخدمات و/أو فيما يتعلق باستخدامها من خلال
                الحساب.
                <br>3. تتمتع HTHA STORE بسلطة تقديرية مطلقة؛ لإلغاء أي طلب شراء و/أو دفع قدمته
                دون تحديد أي أسباب.
                <br>4. يحق لـ HTHA STORE تغيير و/أو تعديل و/أو إزالة طرق الدفع المتاحة على
                البوابات في أي وقت دون إشعار مسبق لك.
                <br>5. أنت مسؤول عن أي رسوم و/أو ضرائب و/أو تكاليف أخرى مرتبطة بشراء و/أو تسليم
                أغراضك الناتجة عن الرسوم التي تفرضها علاقتك مع مزودي خدمات الدفع و/أو
                الرسوم و/أو الضرائب المفروضة من قبل مسؤولي الجمارك المحليين أو الهيئة
                التنظيمية الأخرى.
                <br>6. للاستفسارات و/أو النزاعات المتعلقة بخدمة العملاء، يمكنك الاتصال بنا عبر
                البريد الإلكتروني على العنوان التالي:
                <a
                  href="mailto:Admin@hthastore.com"
                >Admin@HTHA storestore.com</a>، حيث
                سنعمل على حل النزاع إن أمكن.
              </p>
              <p dir="RTL">7. تستخدم HTHA STORE الدفع عن طريق طرف ثالث وهي PayPal.</p>
              <p dir="RTL">
                <strong>سادسا: توافر الخدمات</strong>
                <br>1. الخدمات عادة ما تكون متاحة على أساس يومي ما لم ينص على خلاف ذلك هنا.
                <br>2. قد يكون هناك أوقات معينة قد لا تتوفر فيها الخدمات بسبب صيانة و/أو عطل
                البوابات و/أو أي أسباب أخرى خارجة عن سيطرة HTHA STORE، فلا تقدم HTHA STORE
                أي ضمان بأن الخدمات ستكون متوفرة في هذه الأوقات سالفة الذكر.
                <br>3. ما لم ينص على خلاف ذلك في شروط الخدمة هذه يحق لـ HTHA STORE وفقًا
                لتقديرها المطلق دون إخطارك و/أو الحصول على موافقتك تغيير الإجراءات وطريقة
                تشغيل الخدمات في أي وقت ومن وقت لآخر لأي سبب من الأسباب.
                <br>4. بغض النظر عن أي أحكام تتعارض مع شروط الخدمة هذه يحق لـ HTHA STORE
                <br>أ. إنهاء فوراً و/أو وقف و/أو سحب و/أو تعليق استخدامك للخدمات دون سابق
                إنذار، و/أو فرض شروط و/أو قيود على استخدامك للخدمة دون إشعار.
              </p>
              <p dir="RTL">
                <strong>سابعا:</strong>
                <strong></strong>
                <strong>المسؤولية</strong>
                <br>
                <br>أنت توافق وتؤكد أنه HTHA STORE و/أو موظفيها و/أو وكلائها و/أو المرخص لهم لا
                تتحمل المسؤولية عن أي أضرار خاصة و/أو عرضية و/أو تبعية تنشأ عن الخدمات و/أو
                فيما يتعلق بالخدمات و/أو شروط الخدمة هذه وفيما يتعلق بها.
                <br>
                <strong>
                  <br>
                </strong>
                <strong>ثامنا:</strong>
                <strong>حقوق الملكية الفكرية</strong>
                <br>
                <br>تؤكد بهذا علمك التام بأن جميع حقوق النشر والعلامات التجارية وعلامات
                التجارية محفوظة تحت طائلة المسؤولية القانونية.
                <br>
                <br>
                <strong>تاسعا: الوصول</strong>
                <strong>للبوابات</strong>
                <br>
                <br>1. أنت على علم أن جميع المعاملات التي تتم على البوابات تتم من خلال شبكة
                الاتصالات والبيانات.
                <br>2. أنت على علم تام بأن وصول الإخطار من HTHA STORE والعكس صحيح قد يتأخر أو
                يمنع بسبب العوامل التي تؤثر على مقدمي الخدمات المعنيين والأطراف الأخرى ذات
                الصلة، وعليه أنت توافق على أن HTHA STORE لا يمكن أن يضمن التسليم الفوري
                لهذا الإخطار أو التأكيد.
                <br>3. أنت تقر وتؤكد أنك ستتخذ جميع الخطوات والإجراءات اللازمة للتحقق من سجل
                المعاملات الخاص بحسابك والتحقق منه.
                <br>
                <br>
              </p>
              <p dir="RTL">
                <strong>عاشرا: الحساب</strong>
                <br>يجب عليك إخطار HTHA STORE على الفور إذا كنت على علم و/أو اعتقاد أن حسابك قد
                تم اختراقه، عله أنه ستكون مسؤولاً عن جميع المعاملات التي تتم من خلال حسابك
                في أي وقت قبل استلام HTHA STORE لإشعارك.
                <br>
                <br>
              </p>
              <p dir="RTL">
                <strong>الحادي عشر:</strong>
                <strong>الإفصاح عن المعلومات</strong>
                <br>
                <br>1. بوجب هذا تخول HTHA STORE أن توافق وتوافق بشكل غير قابل للإلغاء وبلا قيد
                و/أو شرط وبالقدر الذي يسمح به القانون ، بالإفصاح عن أي معلومات تتعلق بك
                و/أو بمعاملاتك عبر البوابات إلى الحد الذي قد تراه HTHA STORE وفقًا لتقديرها
                المطلق وقد يكون ذلك ل:
                <br>أ. الكشف بموجب اخطار رسمي من جهات رسمية و/أو قضائية.
                <br>ب. أي طرف آخر تراه HTHA STORE مناسباً.
                <br>2. لن تكشف HTHA STORE عن معلوماتك الشخصية لأي طرف دون إخطار مسبق لك.
                <br>
                <br>
              </p>
              <p dir="RTL">
                <strong>الثاني عشر:</strong>
                <strong>القوانين واللوائح المعمول بها</strong>
                <br>في حال حدوث نزاع يخضع استخدامك للخدمات للولاية القضائية التي يتم فيها إقامة
                HTHA STORE
                <br>
                <br>
                <br>
                <strong>الثالث عشر:</strong>
                <strong></strong>
                <strong>تعليق و/أو إلغاء الخدمات</strong>
                <br>1. قد يتم إلغاء الخدمات و/أو أي جزء منها بواسطة HTHA STORE في أي وقت دون
                إشعار مسبق لك، وقد لا يوجد ما يمنع أن يتم إعادة الخدمات و/أو أي جزء منها
                بشروط الخدمة التي تحددها HTHA STORE وفقًا لتقديرها المطلق.
                <br>2. تحتفظ HTHA STORE بالحق في جميع الأوقات في تعليق و/أو منع الوصول إلى
                الخدمات واستخدامها و/أو أي جزء منها لأي سبب من الأسباب ولأي مدة وأي شروط قد
                تحددها HTHA STORE وفقًا لتقديرها المطلق.
                <br>3. عند إلغاء الخدمات و/أو أي جزء منها:
                <br>أ. جميع الحقوق الممنوحة لك بموجب هذا ستنتهي على الفور وتعود إلى HTHA STORE
                <br>ب. يجب أن تدفع على الفور إلى HTHA STORE جميع الرسوم والمصاريف المستحقة.
                <br>ج. قد تقرر HTHA STORE وفقًا لتقديرها المطلق عدم التصرف بناءً على أي طلب
                تتلقاه من قبلكم بعد تاريخ نفاذ الإنهاء
                <br>د. يجوز ل HTHA STORE وفقًا لتقديرها المطلق أن تقرر عدم التصرف بناءً على أي
                إخطار و/أو طلب تتلقاه HTHA STORE بين تاريخ الإخطار الذي تم توجيه لك وتاريخ
                نفاذ الإنهاء -إذا كان هناك فترة زمنية بين التاريخين-.
              </p>
              <p dir="RTL">
                <strong>
                  <br>
                </strong>
                <strong>الرابع عشر:</strong>
                <strong>الإشعارات</strong>
                <br>
                <br>1. يتم إرسال جميع الإشعارات والمستندات المرسلة من قبلك إلى HTHA STORE عن
                طريق البريد المسجل إلى عنوان HTHA STORE المدرج في البوابات، ويُعتبر أي
                إشعار و/أو أي مستند ترسله إلى HTHA STORE ساريا عندما يتم استلام هذا الإشعار
                و/أو المستند بواسطة HTHA STORE على أن يكون هناك ما يثبت استلامه من قبل HTHA
                STORE.
                <br>2. سيتم إرسال جميع الإشعارات والمستندات لك من قبل HTHA STORE بموجب شروط
                الخدمة هذه بأي طريقة من الطرق التالية:
                <br>أ. البريد الإلكتروني؛ وذلك إلى آخر عنوان بريد إلكتروني معروف لنا وفقًا
                لسجلات HTHA STORE
                <br>ب. نشر الإشعار أو التواصل على البوابات
                <br>ج. الإشعارات الموضوعة مع أو في أي من المراسلات المكتوبة من HTHA STORE لك
                <br>د. إشعارات وضعت من خلال أي وسائل الإعلام
                <br>3. يُعتبر أي إشعار و/أو مستند و/أو اتصال مقدم من HTHA STORE لك قد تم
                استلامه من قبلك في اليوم التالي لإرسال هذا الإشعار و/أو المستند، ويعد اليوم
                الثاني للإرسال بمثابة تاريخ الاستلام.
                <br>
                <strong>
                  <br>
                </strong>
                <strong>الخامس عشر:</strong>
                <strong></strong>
                <strong>التنازل والمدى</strong>
                <br>
                <br>1. أي فشل من جانب HTHA STORE في إنفاذ أي من شروط الخدمة هذه في أي وقت و/أو
                لأي فترة لا يكون تنازلاً عنها و/ أو تنازلا عن حق في أي وقت لاحق في تطبيق
                شروط الخدمة هذه.
                <br>2. في حالة إعلان أي من أحكام شروط الخدمة هذه من قبل أي سلطة قضائية أو سلطة
                مختصة أخرى أنها باطلة أو قابلة للإلغاء أو غير قانونية أو غير قابلة للتنفيذ
                بأي حال ، فإن HTHA STORE تعدل هذا الحكم بطريقة معقولة وتتناسب مع القرار
                الصادر.
              </p>
              <p dir="RTL">
                <strong>السادس عشر:</strong>
                <strong></strong>
                <strong>التعديل على شروط الخدمة</strong>
                <br>
                <br>1. يجوز تعديل شروط الخدمة و/أو إضافتها و/أو حذفها و/أو تغييرها بواسطة HTHA
                STORE عن طريق النشر على البوابات و/أو بأي طريقة أخرى قد تحددها HTHA STORE
                وفقًا لتقديرها المطلق.
                <br>2. في حال تم استمرارك في استخدام الخدمات يشكل موافقة منك على شروط الخدمة
                بصيغتها المعدلة.
              </p>
              <p dir="RTL">
                <strong>
                  <br>
                </strong>
                <strong>السابع عشر:</strong>
                <strong>التنازل و/أو الاحالة لطرف ثالث</strong>
                <br>لا يجوز لك التنازل عن حقوقها بموجب شروط الخدمة هذه دون موافقة كتابية مسبقة
                من HTHA STORE لطرف ثالث.
                <br>
                <br>
                <strong>الثامن عشر:</strong>
                <strong>الخلف الخاص والخلف العام</strong>
                <br>تكون شروط الخدمة ملزمة لأي من خلفك الخاص و/أو العام بما فيمه ورثتك وممثليك
                الشخصيين والقانونيين وخلفائك في المنصب والمهمات المسموح لك عند الاقتضاء.
                <br>
                <br>
                <br>
                <strong></strong>
              </p>
              <p dir="RTL">
                <strong>سياسة خاصة</strong>
                <br>
                <br>انت على علم بأن HTHA STORE تهتم ببعض معلوماتك، ويعد هذا الإشعار سياسة
                الخصوصية الخاصة بنا، حيث تنطبق سياسة الخصوصية على المعلومات التي يتم جمعها
                عنك من أي مصدر و/أو بأي طريقة، وذلك من خلال مواقعنا الإلكترونية و/أو
                تطبيقاتنا و/أو تفاعلاتنا الأخرى القائمة على الإنترنت.
                <br>
                <br>يتم جمع المعلومات الشخصية التالية عن الضيوف:
                <br>1. المعلومات التي تقدمها لنا: حيث أننا نخزن أي معلومات تقوم بإدخالها على
                مواقعنا و/أو التي تقدمها لنا بأي طريقة أخرى، علما أنه يمكنك اختيار عدم
                تقديم معلومات معينة؛ ولكن هذا سيحد من قدرتك على شراء المنتجات المعروضة على
                المواقع الإلكترونية، و/أو الاستفادة من بعض الميزات أو العروض الترويجية.
                <br>2. عند تقديم طلب عبر الإنترنت و/أو في متجر و/أو بأي طريقة أخرى يتم استخدام
                معلومات الاتصال الخاصة بك لتوصيل المعلومات ذات الصلة، مثل تأكيد الطلب
                والشحن وتغيير تاريخ الإصدار وطلبات الحصول على مزيد من المعلومات لتسهيل
                معالجة طلبك، علما أنه يمكنك إلغاء الاشتراك في هذه الاتصالات عن طريق إلغاء
                طلبك.
                <br>3. نحصل على معلومات عنك عندما تبحث و/أو تشتري و/أو تشارك في مسابقة و/أو
                استبيان و/أو تتصل بنا و/أو ترسل معلومات على مواقعنا الإلكترونية، على سبيل
                المثال ، تقدم معلومات عند البحث عن منتج ؛ حيث تقوم بتقديم طلب عبر موقع ويب
                و/أو تقديم معلومات لتحديث و/أو إنشاء حسابك معنا (قد يكون لديك أكثر من حساب
                واحد إذا كنت قد استخدمت أكثر من عنوان بريد إلكتروني واحد عند التسوق معنا) ؛
                وغيرها، علما أن المعلومات التي يتم جمعها عادةً تتضمن اسمك وعنوانك وأرقام
                هاتفك ومعلومات بطاقة الائتمان والأشخاص الذين تم شحن المشتريات إليهم وبما في
                ذلك العناوين ورقم الهاتف ومحتوى المراجعات التي قد تقدمها ورسائل البريد
                الإلكتروني لنا وأي معلومات شخصية أخرى تقدمها لنا أو تنشرها على المواقع
                الإلكترونية.
                <br>4. المعلومات التي نتلقاها أو يمكننا تحديدها من تفاعلك مع مواقعنا
                الإلكترونية تتضمن عنوان الإنترنت (IP) الخاص بك ومعلومات تسجيل الدخول وكلمة
                المرور عنوان البريد الإلكتروني ونوع متصفح الويب والإصدار واللغة المفضلة
                والموقع الجغرافي باستخدام عنوان IP أو تقنية GPS أو اللاسلكية أو تقنية
                Bluetooth على جهازك ونظام التشغيل ومنصة الكمبيوتر وسجل الشراء الذي قد نجمعه
                بمعلومات مماثلة من الضيوف الآخرين أو نضعه في صورة غير مجمعة وغيرها.
              </p>
              <p dir="RTL">
                5. يمكنك الاتصال بنا إذا كنت ترغب في طلب تغيير أو إزالة المعلومات التي تم
                جمعها.
              </p>
              <p dir="RTL">
                6. خدمات موقع الجوال: قد تقوم بعض المتاجر أيضًا بجمع معلومات الموقع
                واستخدامها من الأجهزة المحمولة، حيث تتيح لنا معلومات الموقع معرفة المزيد
                حول كيفية استخدام الضيوف لمتاجرنا لتحسين تجربة الضيف، وفي بعض الحالات تسليم
                إشعارات الدفع والمحتويات الأخرى إلى جهازك المحمول عندما تكون قريبًا والدخول
                والتنقل عبر متاجرنا وإرسال أو توفير لك بالعروض والمعلومات الترويجية التي
                نعتقد أنها قد تهمك. يمكنك منع أو تقييد جمع معلومات الموقع عن طريق إيقاف
                تشغيل جهازك المحمول أو الهوائيات مثل WiFi أو Bluetooth ، وإلغاء الاشتراك في
                خدمات الموقع على جهازك.
                <br>
                <br>
                <br>
              </p>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row justify="center">
        <v-dialog v-model="forget_email_flag" max-width="700">
          <v-card>
            <v-card-title class="headline">Forgot Password Form</v-card-title>
            <h4 style="    margin: 0 0 0 24px;">Enter Your E-mail</h4>
            <form>
              <input
                style="    width: 60%;
                          height: 30px;
                          border: 1px solid grey;
                          margin: 4px -70px 22px 22px;"
                v-model="forget_email"
                type="text"
                placeholder="E-mail"
              >
            </form>
            <button class="forgot-btn">send</button>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  created() {},
  data() {
    return {
      forget_email_flag: false,
      forget_email: "",
      policy_modal: false,
      en_flag: true,
      missing_field: false,
      email_not_valid: false,
      confirm_not_correct: false,
      IncorrectUserOrPass: false,
      createNewUserFlag: true,
      success_cat: false,
      user_exists: false,
      login_flag: true,
      confirm_password: "",
      register_form: {
        name: "",
        username: "",
        password: "",
        email: "",
        address: "",
        phone: "",
        gender: "",
        userTypeId: "a2185bc6-58e7-4b89-9ca8-e9be1e21d59f"
      },
      login_form: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    this.$eventBus.$on("createNewUserSuccess", () => {
      this.createNewUserFlag = true;
      this.success_cat = true;
      setTimeout(() => {
        this.success_cat = false;
        this.login_flag = !this.login_flag;
      }, 2000);
    });

    this.$eventBus.$on("createNewUserError", () => {
      this.createNewUserFlag = true;
      this.user_exists = true;
    });

    this.$eventBus.$on("LoginErrorIncorrectUserOrPass", () => {
      this.IncorrectUserOrPass = true;
    });
  },
  methods: {
    forgotPasswordForm() {},
    showPolicyModal() {
      this.policy_modal = true;
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    async createNewUser() {
      this.user_exists = false;

      if (
        this.register_form.name.length == 0 ||
        this.register_form.username.length == 0 ||
        this.register_form.password.length == 0 ||
        this.register_form.email.length == 0 ||
        this.register_form.address.length == 0 ||
        this.register_form.phone.length == 0 ||
        this.register_form.gender.length == 0
      ) {
        this.missing_field = true;
      } else if (!this.validEmail(this.register_form.email)) {
        this.email_not_valid = true;
      } else if (this.confirm_password != this.register_form.password) {
        this.confirm_not_correct = true;
      } else {
        this.email_not_valid = false;
        this.missing_field = false;
        this.confirm_not_correct = false;

        this.createNewUserFlag = false;

        await this.$store.dispatch("createNewUser", {
          user_info: this.register_form
        });
      }
    },
    login() {
      
      this.$store
        .dispatch("loginNew", this.login_form)
        .then(() => {
          // this.$router.push('/');
        })
        .catch(err => {
          console.log(err);
        });
    },

    onClick() {
      this.setDrawer(!this.$store.state.app.drawer);
    },
    switchToSignIn() {
      this.login_flag = !this.login_flag;
    }
  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.forgot-btn {
  border: 1px solid grey;
  padding: 2px 12px 2px 12px;
  margin: 0 0px 13px 20px;
  border-radius: 7px;
  background: #f8f8f8;
  border-bottom-left-radius: 7px !important;
  border-bottom-right-radius: 7px !important;
}
.lang {
  text-decoration: underline;
  color: blue;
  margin: 0 13px 0 0px;
  cursor: pointer;
}
.terms {
  color: rgb(82, 30, 105) !important;
  text-decoration: underline;
  cursor: pointer;
}
.policy {
  font-size: 12px;
  margin: 42px 0 -31px 0;
  font-weight: 400;
}
.success {
  display: block;
  color: black;
}
.gender {
  display: flex;
  margin: 0 0 0 -66px;
}

.label-gender {
  cursor: pointer;
}

.form .gender input {
  display: inline-block;
  width: 15%;
  margin: 6px -28px 23px 39px;
}

@media only screen and (max-width: 768px) {
  .form .gender input {
    margin: 6px -21px 23px 39px;
  }

  .gender {
    display: flex;
    margin: 0 -130px 0 -60px;
  }
}
.login-page {
  width: 100%;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  width: 100%;
  max-width: 560px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

@media only screen and (max-width: 768px) {
  .form {
    width: 90%;
  }
}

.incorrectUserPass {
  padding: 5px 21px 5px 21px;
  border-radius: 3px;
  color: #fff;
  background-color: #f3692d !important;
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 16px 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 54%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8dc26f);
  background: -moz-linear-gradient(right, #76b852, #8dc26f);
  background: -o-linear-gradient(right, #76b852, #8dc26f);
  background: linear-gradient(to left, #76b852, #8dc26f);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
