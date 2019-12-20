
export const FakeData: any = {
    newestQuestions: [
        {
            "tags": [
                "java",
                "android",
                "firebase",
                "android-fragments"
            ],
            "owner": {
                "reputation": 145,
                "user_id": 10434391,
                "user_type": "registered",
                "profile_image": "https://www.gravatar.com/avatar/fe322cffdc68623ff89c342e9e55e73c?s=128&d=identicon&r=PG&f=1",
                "display_name": "Tomas Mota",
                "link": "https://stackoverflow.com/users/10434391/tomas-mota"
            },
            "is_answered": false,
            "view_count": 6,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576869134,
            "creation_date": 1576869134,
            "question_id": 59430285,
            "link": "https://stackoverflow.com/questions/59430285/why-am-i-getting-this-error-firebaserecycleradapter-in-firebaserecycleradapte",
            "title": "Why am I getting this error &quot;FirebaseRecyclerAdapter() in FirebaseRecyclerAdapter cannot be applied to:&quot;",
            "body": "<p>I am developing an app with posts and am using Firebase as my backend platform.\n As followed, I tried to add the FirebaseRecyclerAdapter, followed the instructions as given but am getting this error, that the guy in the video isn't, and I am not being able to fix it.</p>\n\n<p>Here is my code:</p>\n\n<pre><code>\nimport android.annotation.SuppressLint;\nimport android.content.Intent;\nimport android.gesture.GestureOverlayView;\nimport android.os.Bundle;\nimport android.view.LayoutInflater;\nimport android.view.Menu;\nimport android.view.MenuItem;\nimport android.view.View;\nimport android.view.ViewGroup;\nimport android.widget.LinearLayout;\nimport android.widget.RadioButton;\nimport android.widget.RadioGroup;\nimport android.widget.TextView;\nimport android.widget.Toolbar;\n\n\nimport androidx.annotation.NonNull;\nimport androidx.appcompat.app.ActionBar;\nimport androidx.appcompat.app.ActionBarDrawerToggle;\nimport androidx.appcompat.app.AppCompatActivity;\nimport androidx.fragment.app.Fragment;\nimport androidx.multidex.MultiDex;\nimport androidx.recyclerview.widget.LinearLayoutManager;\nimport androidx.recyclerview.widget.RecyclerView;\n\nimport com.example.shrinkio.Fragments.HomeFragment;\nimport com.example.shrinkio.Fragments.MessagesFragment;\nimport com.example.shrinkio.Fragments.NotFragment;\nimport com.example.shrinkio.Fragments.PeopleFragment;\nimport com.example.shrinkio.R;\nimport com.example.shrinkio.SecondaryActivities.DrawerLayout;\nimport com.example.shrinkio.SecondaryActivities.PostActivity;\nimport com.example.shrinkio.SecondaryActivities.Posts;\nimport com.example.shrinkio.SecondaryActivities.ProfileActivity;\nimport com.example.shrinkio.SecondaryActivities.SettingsActivity;\nimport com.firebase.ui.database.FirebaseRecyclerAdapter;\nimport com.firebase.ui.database.FirebaseRecyclerOptions;\nimport com.google.android.material.bottomnavigation.BottomNavigationView;\nimport com.google.android.material.navigation.NavigationView;\nimport com.google.firebase.database.DatabaseReference;\nimport com.google.firebase.database.FirebaseDatabase;\nimport com.google.firebase.database.Query;\nimport com.google.firebase.storage.StorageReference;\n\nimport java.util.Objects;\n\nimport static com.example.shrinkio.R.menu.main_menu;\n\n\npublic class BottomActivity extends AppCompatActivity\n        implements NavigationView.OnNavigationItemSelectedListener {\n\n    RadioGroup radioGroup;\n    RadioButton Rd1, Rd2, Rd3, Rd4;\n    RecyclerView rv;\n\n\n\n    private ActionBar actionBar;\n    private DrawerLayout mDrawerLayout;\n    private ActionBarDrawerToggle mDrawerToggle;\n    private StorageReference StorageRef;\n\n    private Toolbar toolbar;\n\n    private DatabaseReference mDataBase;\n\n\n    @SuppressLint({\"RtlHardcoded\", \"ClickableViewAccessibility\"})\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        MultiDex.install(this);\n\n\n        super.onCreate( savedInstanceState );\n        setContentView( R.layout.activity_bottom );\n        new GestureOverlayView( this );\n\n        //Action bar configurations\n        Objects.requireNonNull( getSupportActionBar() ).setDisplayOptions( ActionBar.DISPLAY_SHOW_CUSTOM);\n        getSupportActionBar().setCustomView( R.layout.abs_layout_home );\n\n\n\n\n        //Navigation view\n        NavigationView nav_view;\n        nav_view = findViewById(R.id.nav_view);   //select nav_view from activity_drawer_layout\n        nav_view.setNavigationItemSelectedListener(this);\n        View nav_header = nav_view.getHeaderView(0);\n\n\n        rv = findViewById(R.id.recyclerView);\n        rv.setHasFixedSize(true);\n        rv.setLayoutManager(new LinearLayoutManager(this));\n\n        mDataBase = FirebaseDatabase.getInstance().getReference().child(\"Posts\");\n\n\n\n        //Navigation Drawer header menu items on click actions\n\n        LinearLayout header = nav_header.findViewById( R.id.nav_header);\n        header.setOnClickListener( new View.OnClickListener() {\n            @Override\n            public void onClick(View v) {\n                startActivity( new Intent( BottomActivity.this, ProfileActivity.class ) );\n            }\n        } );\n\n        BottomNavigationView bottomNav = findViewById(R.id.bottom_navigation);\n        bottomNav.setOnNavigationItemSelectedListener(navListener);\n\n        //I added this if statement to keep the selected fragment when rotating the device\n        if (savedInstanceState == null) {\n            getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,\n                    new HomeFragment()).commit();\n        }\n\n    }\n\n\n    @Override\n    protected void onStart() {\n        super.onStart();\n\n        FirebaseRecyclerOptions&lt;Posts&gt; options = new FirebaseRecyclerOptions.Builder&lt;Posts&gt;()\n                .setQuery(mDataBase, Posts.class)\n                .build();\n\n\n        FirebaseRecyclerAdapter firebaseRecyclerAdapter = new FirebaseRecyclerAdapter &lt;Posts, PostViewHolder&gt; (\n                Posts.class,\n                R.layout.posts,\n                PostViewHolder.class,\n                mDataBase\n        ) {\n            @Override\n            protected void onBindViewHolder(@NonNull PostViewHolder holder, int position, Posts model) {\n            holder.setPost(model.getPost());\n            }\n\n            @NonNull\n            @Override\n            public PostViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {\n                View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.posts, parent, false);\n\n                return new PostViewHolder(view);\n            }\n        };\n\n\n\n\n        rv.setAdapter(firebaseRecyclerAdapter);\n    }\n\n\n    public static class PostViewHolder extends RecyclerView.ViewHolder{\n        View mview;\n\n        public PostViewHolder(@NonNull View itemView) {\n            super(itemView);\n\n            mview = itemView;\n        }\n\n        public void setPost(String post) {\n            TextView post_title = mview.findViewById(R.id.post);\n            post_title.setText(post);\n        }\n    }\n\n\n\n    //Define the options menu\n    @Override\n    public boolean onCreateOptionsMenu(Menu menu) {\n        getMenuInflater().inflate(main_menu, menu);\n        return super.onCreateOptionsMenu(menu);\n    }\n\n    @Override\n    public boolean onOptionsItemSelected(MenuItem item) {\n        {\n            if (item.getItemId() == R.id.add){\n                startActivity(new Intent(this, PostActivity.class));\n            }\n        }\n        return super.onOptionsItemSelected(item);\n    }\n\n\n\n    // Bottom Navigation View, when the fragment is selected\n    private BottomNavigationView.OnNavigationItemSelectedListener navListener =\n            new BottomNavigationView.OnNavigationItemSelectedListener() {\n                @Override\n                public boolean onNavigationItemSelected(@NonNull MenuItem item) {\n                    Fragment selectedFragment = null;\n\n                    switch (item.getItemId()) {\n                        case R.id.navigation_home:\n                            selectedFragment = new HomeFragment();\n                            break;\n                        case R.id.navigation_dashboard:\n                            selectedFragment = new NotFragment();\n                            break;\n                        case R.id.navigation_people:\n                            selectedFragment = new PeopleFragment();\n                            break;\n                        case R.id.navigation_messages:\n                            selectedFragment = new MessagesFragment();\n                    }\n\n                    getSupportFragmentManager().beginTransaction().replace(R.id.fragment_container,\n                            selectedFragment).commit();\n\n                    return true;\n                }\n            };\n\n\n    // Navigation menu items on click action\n    @Override\n    public boolean onNavigationItemSelected (@NonNull MenuItem item){\n        switch (item.getItemId()) {\n            case R.id.nav_profile:\n                startActivity( new Intent( BottomActivity.this, ProfileActivity.class ) );\n                overridePendingTransition( 0, 0 );\n                return true;\n            case R.id.nav_settings:\n                startActivity( new Intent( BottomActivity.this, SettingsActivity.class ) );\n                overridePendingTransition( 0, 0 );\n                return true;\n            default:\n                return super.onOptionsItemSelected( item );\n        }\n\n\n    }\n\n    @Override\n    public void onBackPressed() {\n        super.onBackPressed();\n    }\n}\n\n\n\n</code></pre>\n\n<p>I am getting the error that I typed in the question. \n None of the answers on StackOverflow worked for me, that's why I am making a new post.</p>\n"
        },
        {
            "tags": [
                "android",
                "android-scrollview"
            ],
            "owner": {
                "reputation": 15089,
                "user_id": 1024973,
                "user_type": "registered",
                "accept_rate": 72,
                "profile_image": "https://www.gravatar.com/avatar/e9a46874cd35d5753507f10188ec83a8?s=128&d=identicon&r=PG",
                "display_name": "AndroidDev",
                "link": "https://stackoverflow.com/users/1024973/androiddev"
            },
            "is_answered": false,
            "view_count": 4,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576868640,
            "creation_date": 1576868640,
            "question_id": 59430205,
            "link": "https://stackoverflow.com/questions/59430205/actionnext-wont-scroll-to-reveal-the-last-textinputlayout",
            "title": "actionNext Won&#39;t Scroll to Reveal the Last TextInputLayout",
            "body": "<p>I have a <code>ConstraintLayout</code> that contains 8 <code>TextInputLayout</code> fields, each in a vertical orientation (like a vertical <code>LinearLayout</code>). Each has this line in its <code>TextInputEditText</code>:</p>\n\n<pre><code>android:imeOptions=\"actionNext\"\n</code></pre>\n\n<p>The constraint layout is contained in a <code>NestedScrollView</code>.</p>\n\n<p>This is supposed to act as a simple form to capture registration data. As the user finishes each field, they tap the <code>Next</code> button and the form scrolls vertically to the next field. </p>\n\n<p>This all works fine until the user finishes the second to last field. At that point, when the user taps next, the form neither scrolls nor does it give the focus to the final field. That field is hidden behind the soft keyboard so the user does not know it is there. I can manually scroll the form to reveal it, but that is not the behavior that I am trying to achieve.</p>\n\n<p>Here is the relevant parts of the xml:</p>\n\n<p>Activity:</p>\n\n<pre><code>&lt;androidx.core.widget.NestedScrollView\n    android:layout_width=\"match_parent\"\n    android:layout_height=\"wrap_content\"\n    app:layout_behavior=\"@string/appbar_scrolling_view_behavior\"\n    app:layout_constraintBottom_toBottomOf=\"parent\"\n    app:layout_constraintEnd_toEndOf=\"parent\"\n    app:layout_constraintStart_toStartOf=\"parent\"\n    app:layout_constraintTop_toTopOf=\"parent\"&gt;\n\n    &lt;fragment\n        android:id=\"@+id/onboarding_nav_host_fragment\"\n        android:name=\"androidx.navigation.fragment.NavHostFragment\"\n        android:layout_width=\"match_parent\"\n        android:layout_height=\"wrap_content\"\n        app:defaultNavHost=\"false\"\n        app:navGraph=\"@navigation/onboarding_nav_graph\" /&gt;\n\n&lt;/androidx.core.widget.NestedScrollView&gt;\n</code></pre>\n\n<p>And then in the fragment, here are the last two TextInputLayouts. The others follow a similar structure, so I'm omitting them, at least for now, for brevity:</p>\n\n<pre><code>&lt;com.google.android.material.textfield.TextInputLayout\n            android:id=\"@+id/password_layout\"\n            android:layout_width=\"match_parent\"\n            android:layout_height=\"wrap_content\"\n            android:layout_marginTop=\"8dp\"\n            app:errorTextAppearance=\"@style/error_appearance\"\n            app:layout_constraintTop_toBottomOf=\"@id/cell_layout\"\n            app:layout_constraintEnd_toEndOf=\"parent\"\n            app:layout_constraintStart_toStartOf=\"parent\"\n            app:layout_constraintWidth_percent=\"0.8\"\n            app:passwordToggleEnabled=\"true\"\n            app:passwordToggleTint=\"@color/colorAccent\"\n            style=\"@style/MyTextInputLayout\"&gt;\n\n            &lt;com.google.android.material.textfield.TextInputEditText\n                android:id=\"@+id/reg_password\"\n                android:layout_width=\"match_parent\"\n                android:layout_height=\"wrap_content\"\n                android:hint=\"@string/enter_password\"\n                android:maxLines=\"1\"\n                android:inputType=\"textPassword\"\n                android:imeOptions=\"actionNext\"\n                android:text=\"@{registrationData.password}\"\n                bind:regularTypeface='@{\"raleway\"}'\n                style=\"@style/MyTextInputEditText\"/&gt;\n\n        &lt;/com.google.android.material.textfield.TextInputLayout&gt;\n\n        &lt;com.google.android.material.textfield.TextInputLayout\n            android:id=\"@+id/password_confirm_layout\"\n            android:layout_width=\"match_parent\"\n            android:layout_height=\"wrap_content\"\n            android:layout_marginTop=\"8dp\"\n            app:errorTextAppearance=\"@style/error_appearance\"\n            app:layout_constraintTop_toBottomOf=\"@id/password_layout\"\n            app:layout_constraintEnd_toEndOf=\"parent\"\n            app:layout_constraintStart_toStartOf=\"parent\"\n            app:layout_constraintWidth_percent=\"0.8\"\n            app:passwordToggleEnabled=\"true\"\n            app:passwordToggleTint=\"@color/colorAccent\"\n            style=\"@style/MyTextInputLayout\"&gt;\n\n            &lt;com.google.android.material.textfield.TextInputEditText\n                android:id=\"@+id/reg_password_confirm\"\n                android:layout_width=\"match_parent\"\n                android:layout_height=\"wrap_content\"\n                android:hint=\"@string/password_confirmation\"\n                android:maxLines=\"1\"\n                android:inputType=\"textPassword\"\n                android:imeOptions=\"actionDone\"\n                bind:regularTypeface='@{\"raleway\"}'\n                style=\"@style/MyTextInputEditText\"/&gt;\n\n        &lt;/com.google.android.material.textfield.TextInputLayout&gt;\n</code></pre>\n\n<p>Finally, in the <code>AndroidManifest</code>, the activity is declared like this:</p>\n\n<pre><code>&lt;activity\n    android:name=\".activities.OnboardingActivity\"\n    android:theme=\"@style/AppTheme.NoActionBar\"\n    android:windowSoftInputMode=\"adjustResize\"/&gt;\n</code></pre>\n\n<p>Cannot figure out what I am missing. How can I get the scroll view to reveal the last field without the user having to scroll the field manually?</p>\n"
        },
        {
            "tags": [
                "android",
                "cordova",
                "cordova-plugins",
                "phonegap",
                "android-10.0"
            ],
            "owner": {
                "reputation": 168,
                "user_id": 2093658,
                "user_type": "registered",
                "accept_rate": 27,
                "profile_image": "https://i.stack.imgur.com/9FG8b.gif?s=128&g=1",
                "display_name": "bertmaclin",
                "link": "https://stackoverflow.com/users/2093658/bertmaclin"
            },
            "is_answered": false,
            "view_count": 4,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576868303,
            "creation_date": 1576868303,
            "question_id": 59430144,
            "link": "https://stackoverflow.com/questions/59430144/cordova-plugin-file-android-q-permissions-error",
            "title": "Cordova Plugin-File Android Q Permissions Error",
            "body": "<p>So Android 10 broke Cordovas plugin file as it gives permission errors relating to this change: <a href=\"https://developer.android.com/training/data-storage#scoped-storage\" rel=\"nofollow noreferrer\">https://developer.android.com/training/data-storage#scoped-storage</a></p>\n\n<p>I came across this possible solution <a href=\"https://github.com/bumptech/glide/issues/3896\" rel=\"nofollow noreferrer\">https://github.com/bumptech/glide/issues/3896</a> but Cordova does not seem to support it.</p>\n\n<p>The following config.xml produces an error</p>\n\n<pre><code>&lt;?xml version='1.0' encoding='utf-8'?&gt;\n&lt;widget id=\"io.cordova.hellocordova\" version=\"1.0.0\" xmlns=\"http://www.w3.org/ns/widgets\" xmlns:android=\"http://schemas.android.com/apk/res/android\" xmlns:cdv=\"http://cordova.apache.org/ns/1.0\"&gt;\n    &lt;name&gt;HelloCordova&lt;/name&gt;\n    &lt;description&gt;\n        A sample Apache Cordova application that responds to the deviceready event.\n    &lt;/description&gt;\n    &lt;author email=\"dev@cordova.apache.org\" href=\"http://cordova.io\"&gt;\n        Apache Cordova Team\n    &lt;/author&gt;\n    &lt;content src=\"index.html\" /&gt;\n    &lt;plugin name=\"cordova-plugin-whitelist\" spec=\"1\" /&gt;\n    &lt;access origin=\"*\" /&gt;\n    &lt;allow-intent href=\"http://*/*\" /&gt;\n    &lt;allow-intent href=\"https://*/*\" /&gt;\n    &lt;allow-intent href=\"tel:*\" /&gt;\n    &lt;allow-intent href=\"sms:*\" /&gt;\n    &lt;allow-intent href=\"mailto:*\" /&gt;\n    &lt;allow-intent href=\"geo:*\" /&gt;\n    &lt;edit-config file=\"AndroidManifest.xml\" mode=\"merge\" target=\"/manifest/application\"&gt;\n        &lt;application android:allowBackup=\"false\" /&gt;\n        &lt;application android:fullBackupContent=\"false\" /&gt;\n        &lt;application android:requestLegacyExternalStorage=\"true\" /&gt;\n    &lt;/edit-config&gt;\n    &lt;platform name=\"android\"&gt;\n        &lt;allow-intent href=\"market:*\" /&gt;\n    &lt;/platform&gt;\n    &lt;platform name=\"ios\"&gt;\n        &lt;allow-intent href=\"itms:*\" /&gt;\n        &lt;allow-intent href=\"itms-apps:*\" /&gt;\n    &lt;/platform&gt;\n    &lt;engine name=\"android\" spec=\"^8.1.0\" /&gt;\n&lt;/widget&gt;\n</code></pre>\n\n<p><code>../debug/AndroidManifest.xml:22: AAPT: error: attribute android:requestLegacyExternalStorage not found.</code></p>\n\n<p>My Android studio shows the latest sdks being used.</p>\n"
        },
        {
            "tags": [
                "android",
                "android-studio"
            ],
            "owner": {
                "reputation": 324,
                "user_id": 483709,
                "user_type": "registered",
                "accept_rate": 56,
                "profile_image": "https://www.gravatar.com/avatar/110519a99a5e9fd9b0dab79e021293dc?s=128&d=identicon&r=PG&f=1",
                "display_name": "adamacdo",
                "link": "https://stackoverflow.com/users/483709/adamacdo"
            },
            "is_answered": false,
            "view_count": 11,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576868133,
            "creation_date": 1576868133,
            "question_id": 59430118,
            "link": "https://stackoverflow.com/questions/59430118/android-studio-links-projects-which-include-same-local-library",
            "title": "Android Studio Links Projects Which Include Same Local Library",
            "body": "<p>Within Android Studio I have a Library Project (SDK) and 2 projects which implement the SDK (Project 1 and Project 2).</p>\n\n<p>In each of the 2 projects' <code>settings.gradle</code> I am softlinking to the library project:</p>\n\n<pre><code>include ':theSdk'  \nproject(':theSdk').projectDir = new File('../path/to/sdk/libraryModule')\n</code></pre>\n\n<p>The problem is that when I open Project 1 and build, and then open Project 2 and build I see Project 1 linked inside Project 2.  There are no other references between the 2 projects, other than they each have the SDK softlinked to them.  </p>\n\n<p>Within Project 1 I see Project 2 listed as a module in the Project Settings modal, as well as being listed as a module in the Project window.</p>\n\n<p>Has anyone else run into this, and if so how do I prevent my projects from muddying each other up?</p>\n\n<p>Thanks</p>\n"
        },
        {
            "tags": [
                "android",
                "deep-linking",
                "appsflyer"
            ],
            "owner": {
                "reputation": 459,
                "user_id": 8173400,
                "user_type": "registered",
                "profile_image": "https://lh4.googleusercontent.com/-jg_VR0GsFTU/AAAAAAAAAAI/AAAAAAAAAOU/L1w8mrrpVIo/photo.jpg?sz=128",
                "display_name": "Fillipe Duoli",
                "link": "https://stackoverflow.com/users/8173400/fillipe-duoli"
            },
            "is_answered": false,
            "view_count": 8,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576867781,
            "creation_date": 1576867781,
            "question_id": 59430062,
            "link": "https://stackoverflow.com/questions/59430062/deeplink-on-chrome-for-android-not-working-properly",
            "title": "Deeplink on Chrome for Android not working properly",
            "body": "<p>I having a problem to make an Apps Flyer OneLink to work properly on Android with Chrome browser. On any other browser everything works fine.</p>\n\n<p>The problem is, deeplink doesn't always open the app when I try open thru Chrome. Sometimes it work, but for a lot of users are only redirected to fallback url.</p>\n\n<p>Here is a deeplink to test:</p>\n\n<p><a href=\"https://sparkle.onelink.me/twwu?pid=test&amp;af_force_deeplink=true&amp;af_dp=https%3A%2F%2Fsparkle.hotmart.com%2Fu%2FLipeDuoli%3Futm_campaign%3D0000-0000-0000&amp;af_web_dp=https%3A%2F%2Fsparkle.hotmart.com%2Fusers%2FLipeDuoli&amp;af_ios_url=https%3A%2F%2Fsparkle.hotmart.com%2Fdownload&amp;af_android_url=https%3A%2F%2Fsparkle.hotmart.com%2Fdownload\" rel=\"nofollow noreferrer\">https://sparkle.onelink.me/twwu?pid=test&amp;af_force_deeplink=true&amp;af_dp=https%3A%2F%2Fsparkle.hotmart.com%2Fu%2FLipeDuoli%3Futm_campaign%3D0000-0000-0000&amp;af_web_dp=https%3A%2F%2Fsparkle.hotmart.com%2Fusers%2FLipeDuoli&amp;af_ios_url=https%3A%2F%2Fsparkle.hotmart.com%2Fdownload&amp;af_android_url=https%3A%2F%2Fsparkle.hotmart.com%2Fdownload</a></p>\n\n<p>I`m already did everything that says here:\n<a href=\"https://developer.android.com/training/app-links/verify-site-associations\" rel=\"nofollow noreferrer\">https://developer.android.com/training/app-links/verify-site-associations</a></p>\n\n<p>Thx</p>\n"
        },
        {
            "tags": [
                "android",
                "android-studio",
                "exoplayer"
            ],
            "owner": {
                "reputation": 11,
                "user_id": 12234461,
                "user_type": "registered",
                "profile_image": "https://lh4.googleusercontent.com/-fnBmb2tTVT4/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3reWhYRJP-VAk5MlUSgKwk7lOZ7WZw/photo.jpg?sz=128",
                "display_name": "Oni",
                "link": "https://stackoverflow.com/users/12234461/oni"
            },
            "is_answered": false,
            "view_count": 6,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576867720,
            "creation_date": 1576867720,
            "question_id": 59430055,
            "link": "https://stackoverflow.com/questions/59430055/my-exoplayer-is-opening-streams-but-no-audio",
            "title": "My ExoPlayer Is opening Streams but no audio",
            "body": "<p>I have created an app to play some m3u8/ts urls with exoplayer version 2.10.5 \nThe urls play good but some of them has only video but no audio and some other urls it works as it should, having both video and audio. Some of the urls on vlc say that have aac audios and those links seems to play both video and audio. The app struggles play both audio and video on a part of the streams with mp2 audio, there are other streams with mp2 audio which play both audio and video. Thats why i don't know what is going on, on audio mp2 40% of the links i have tried work good, and some of mp2 60% do not work with audio.\nthe debug</p>\n\n<pre><code>I/ExoPlayerImpl: Init b6a37fa [ExoPlayerLib/2.10.5] [lv3n, LG-M200, LGE, 27]\nD/INFO: ActivityVideoPlayer\nE/FA: Task exception on worker thread: java.lang.NoSuchFieldError: No static field zzaqq of type [Ljava/lang/String; in class Lcom/google/android/gms/measurement/internal/zzcu; or its superclasses (declaration of 'com.google.android.gms.measurement.internal.zzcu' appears in /data/app/com.app.OniHD-d6Z9YgKSRXasFDMB0IqZuQ==/base.apk!classes2.dex): com.google.android.gms.measurement.internal.zzfy.zzcu(Unknown Source:161)\nV/FA: Activity resumed, time: 868504897\nW/Adreno-EGL: &lt;qeglDrvAPI_eglGetConfigAttrib:612&gt;: EGL_BAD_ATTRIBUTE\nD/vndksupport: Loading /vendor/lib/hw/gralloc.msm8937.so from current namespace instead of sphal namespace.\nD/ActivityStreamPlayer: onTimelineChanged: \nD/ActivityStreamPlayer: onLoadingChanged: true\nD/FA: Connected to remote service\nV/FA: Processing queued up service tasks: 1\nI/Timeline: Timeline: Activity_idle id: android.os.BinderProxy@af1afee time:281647215\nW/VideoCapabilities: Unrecognized profile 2130706433 for video/avc\n   Unrecognized profile 2130706434 for video/avc\nW/VideoCapabilities: Unrecognized profile 2130706433 for video/avc\n   Unrecognized profile 2130706434 for video/avc\nD/ActivityStreamPlayer: onTracksChanged: 3\nD/MediaCodec: CreateByComponentName name=OMX.qcom.video.decoder.avc\n   Mediacodec create pid=16947\n   init()++ name=OMX.qcom.video.decoder.avc,nameIsType=0,encoder=0\nV/LGCodecAdapter: LG Codec Adapter start\n   load libLGCodecOSAL library\nV/LGCodecOSAL: Just Validatation check function\nI/ACodec: Now uninitialized\nD/MediaCodec: kWhatInit received\nI/ACodec: onAllocateComponent\nI/OMXClient: Treble IOmx obtained\nD/MediaCodec: onComponentAllocated() componentName=OMX.qcom.video.decoder.avc\nI/ACodec: [OMX.qcom.video.decoder.avc] Now Loaded\nD/MediaCodec: kWhatComponentAllocated received\nD/MediaCodec: init()--\nD/MediaCodec: kWhatConfigure received\nD/SurfaceUtils: connecting to surface 0x76ff4808, reason connectToSurface\nI/MediaCodec: [OMX.qcom.video.decoder.avc] setting surface generation to 17353729\nD/SurfaceUtils: disconnecting from surface 0x76ff4808, reason connectToSurface(reconnect)\nD/SurfaceUtils: connecting to surface 0x76ff4808, reason connectToSurface(reconnect)\nV/LGCodecAdapter: called getLGCodecSpecificData\nV/LGCodecOSAL: Called LGgetCodecSpecificDataMSG\nV/LGCodecAdapter: called IsLGComponent\nI/ExtendedACodec: setupVideoDecoder()\nI/ExtendedACodec: Decoder will be in frame by frame mode\nV/LGCodecOSAL: Called LGconfigureCodecMSG\n   Not support LGCodec\nD/MediaCodec: onComponentConfigured()\nD/MediaCodec: kWhatComponentConfigured received\nD/MediaCodec: start()\nD/MediaCodec: kWhatStart received\nD/SurfaceUtils: set up nativeWindow 0x76ff4808 for 720x576, color 0x7fa30c04, rotation 0, usage 0x20002900\nI/ACodec: [OMX.qcom.video.decoder.avc] Allocating 22 meta buffers on output port\nI/ACodec: [OMX.qcom.video.decoder.avc] Now Idle-&gt;Executing\nI/ACodec: [OMX.qcom.video.decoder.avc] Now Executing\nI/ACodec: [OMX.qcom.video.decoder.avc] Now handling output port settings change\nD/SurfaceUtils: set up nativeWindow 0x76ff4808 for 720x576, color 0x7fa30c04, rotation 0, usage 0x20002900\nI/ACodec: [OMX.qcom.video.decoder.avc] Allocating 10 meta buffers on output port\nI/ACodec: [OMX.qcom.video.decoder.avc] Now Executing\nD/ActivityStreamPlayer: onPlayerStateChanged: true\nI/zygote: Background concurrent copying GC freed 103397(7MB) AllocSpace objects, 70(2MB) LOS objects, 66% free, 5MB/17MB, paused 197us total 127.642ms\nV/FA: Session started, time: 868507783\nE/FA: Task exception on worker thread: java.lang.NoSuchFieldError: No static field zzaqr of type [Ljava/lang/String; in class Lcom/google/android/gms/measurement/internal/zzcu; or its superclasses (declaration of 'com.google.android.gms.measurement.internal.zzcu' appears in /data/app/com.app.OniHD-d6Z9YgKSRXasFDMB0IqZuQ==/base.apk!classes2.dex): com.google.android.gms.measurement.internal.zzaq.zzbt(Unknown Source:11)\nI/zygote: Do full code cache collection, code=507KB, data=419KB\nI/zygote: After code cache collection, code=502KB, data=339KB\nV/FA: Inactivity, disconnecting from the service\nI/zygote: Do partial code cache collection, code=506KB, data=343KB\nI/zygote: After code cache collection, code=506KB, data=343KB\n   Increasing code cache capacity to 2MB\nW/DpmTcmClient: Couldn't find 'tcm' socket after 120times. quit trying\n</code></pre>\n\n<p>ExoPlayer -</p>\n\n<pre><code>private void setupPlayer() {\n            BANDWIDTH_METER = new DefaultBandwidthMeter.Builder(this)\n                    .build();\n            mediaDataSourceFactory = buildDataSourceFactory(true);\n            RenderersFactory renderersFactory = new DefaultRenderersFactory(this);\n            TrackSelection.Factory videoTrackSelectionFactory = new AdaptiveTrackSelection.Factory();\n            TrackSelector trackSelector = new DefaultTrackSelector(videoTrackSelectionFactory);\n            LoadControl loadControl = new DefaultLoadControl();\n            player = ExoPlayerFactory.newSimpleInstance(this, renderersFactory,\n                    trackSelector,\n                    loadControl);\n\n        playerView = findViewById(R.id.exoPlayerView);\n        playerView.setPlayer(player);\n        playerView.setRepeatToggleModes(REPEAT_TOGGLE_MODE_ALL);\n        playerView.setUseController(true);\n        playerView.requestFocus();\n\n        Uri uri = Uri.parse(url);\n\n\n        MediaSource mediaSource = buildMediaSource(uri, null);\n\n        player.prepare(mediaSource);\n        player.setPlayWhenReady(true);```\n\n</code></pre>\n"
        },
        {
            "tags": [
                "android",
                "fonts",
                "android-styles",
                "android-typeface"
            ],
            "owner": {
                "reputation": 563,
                "user_id": 5393360,
                "user_type": "registered",
                "accept_rate": 73,
                "profile_image": "https://i.stack.imgur.com/0Ebrh.jpg?s=128&g=1",
                "display_name": "Igor Skryl",
                "link": "https://stackoverflow.com/users/5393360/igor-skryl"
            },
            "is_answered": false,
            "view_count": 6,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576867699,
            "creation_date": 1576867699,
            "question_id": 59430051,
            "link": "https://stackoverflow.com/questions/59430051/android-font-is-not-applied-for-button-via-style",
            "title": "Android font is not applied for button via style",
            "body": "<p>I created style for <code>Button</code></p>\n\n<pre><code>&lt;style name=\"MainButtonStyle\"&gt;\n    &lt;item name=\"android:background\"&gt;@drawable/btn_main_selector&lt;/item&gt;\n    &lt;item name=\"android:textColor\"&gt;@color/btn_main_text_color_selector&lt;/item&gt;\n    &lt;item name=\"android:minHeight\"&gt;40dp&lt;/item&gt;\n    &lt;item name=\"android:textSize\"&gt;18sp&lt;/item&gt;\n    &lt;item name=\"android:gravity\"&gt;center&lt;/item&gt;\n    &lt;item name=\"android:textAppearance\"&gt;@font/bold&lt;/item&gt;\n&lt;/style&gt;\n</code></pre>\n\n<p>This style applies in the <code>AppTheme</code></p>\n\n<pre><code> &lt;item name=\"android:buttonStyle\"&gt;@style/MainButtonStyle&lt;/item&gt;\n</code></pre>\n\n<p><code>bold.ttf</code> file is in <code>res/font</code> folder</p>\n\n<p>If I run an app I still see the default font. Where is the catch?</p>\n"
        },
        {
            "tags": [
                "android",
                "facebook",
                "mobile",
                "cross-browser",
                "resolution"
            ],
            "owner": {
                "reputation": 1,
                "user_id": 12572362,
                "user_type": "registered",
                "profile_image": "https://graph.facebook.com/10162751956015035/picture?type=large",
                "display_name": "Dimitri Marshall",
                "link": "https://stackoverflow.com/users/12572362/dimitri-marshall"
            },
            "is_answered": false,
            "view_count": 5,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576867633,
            "creation_date": 1576867633,
            "question_id": 59430036,
            "link": "https://stackoverflow.com/questions/59430036/what-is-the-best-resolution-to-use-for-a-fb-playable-ad",
            "title": "What is the best resolution to use for a FB Playable Ad?",
            "body": "<p>I'm currently developing a playable ad for use on Facebook and have received conflicting information about what resolution to use.</p>\n\n<p>Based on some tests, I developed my use case using a 410x729 resolution. The test involved using a combination of FB Instant Games, Google Studio, and various mobile devices (Android and iOS) to determine which resolution displayed correctly.</p>\n\n<p>According to FBs <a href=\"https://developers.facebook.com/tools/playable-preview/\" rel=\"nofollow noreferrer\">'Playable Preview' App</a>, acceptable resolutions are:</p>\n\n<ul>\n<li>iPhone7: 375x667</li>\n<li>Google Pixel: 411x731</li>\n<li>Samsung Galaxy S8: 360x740</li>\n</ul>\n\n<p>Information I got from one of our 3rd party ad handles indicated that the best resolution to use for news feed is 867x1080, which does not display correctly in any of the tests I conducted, or within the confines of the FB Playable Preview App.</p>\n\n<p>Probably not relavent, but the software I'm using to develop the playable is Google Web Designer, which allows me to create dynamic resolutions. That being said, I'm unsure if that feature is appropriate for this use case.</p>\n\n<p>Thanks in advance for any help. Greatly appreciated.</p>\n"
        },
        {
            "tags": [
                "android",
                "node.js",
                "mongodb"
            ],
            "owner": {
                "reputation": 1,
                "user_id": 11273884,
                "user_type": "registered",
                "profile_image": "https://graph.facebook.com/2150157385060534/picture?type=large",
                "display_name": "Md.Maruf Billah",
                "link": "https://stackoverflow.com/users/11273884/md-maruf-billah"
            },
            "is_answered": false,
            "view_count": 6,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576867624,
            "creation_date": 1576867624,
            "question_id": 59430034,
            "link": "https://stackoverflow.com/questions/59430034/problem-to-sending-multiple-data-data-pass-to-android-from-mongodb-via-node-js",
            "title": "Problem to Sending Multiple data (Data pass to Android from mongodb via node js)",
            "body": "<p>Here the code is well decorated and it's working. But the problem is I want all the login table data. as like all the login user's email and all the login user's name. how can I do this? Which part of the code I should change?</p>\n\n<p><strong>This is node js part</strong></p>\n\n<pre><code>const app = express()\nconst mongoClient = require('mongodb').MongoClient\n\nconst url = \"mongodb://localhost:27017\"\n\napp.use(express.json())\n\nmongoClient.connect(url, (err, db) =&gt; {\n\n    if (err) {\n        console.log(\"Error while connecting mongo client\")\n    } else {\n\n        const myDb = db.db('myDb')\n        const collection = myDb.collection('myTable')\n\n\n        app.post('/login', (req, res) =&gt; {\n\n            const query = {\n                email: req.body.email, \n                password: req.body.password\n            }\n\n            collection.findOne(query, (err, result) =&gt; {\n\n                if (result != null) {\n\n                    const objToSend = {\n                        name: result.name,\n                        email: result.email\n                    }\n\n                    res.status(200).send(JSON.stringify(objToSend))\n\n                } else {\n                    res.status(404).send()\n                }\n\n            })\n\n        })\n\n    }\n\n})\n\napp.listen(3000, () =&gt; {\n    console.log(\"Listening on port 3000...\")\n})\n</code></pre>\n\n<p><strong>This is android part 01</strong></p>\n\n<pre><code>\n    private String name;\n\n    private String email;\n}\n</code></pre>\n\n<p><strong>This is android part 02</strong></p>\n\n<pre><code>\n    @POST(\"/login\")\n    Call&lt;LoginResult&gt; executeLogin(@Body HashMap&lt;String, String&gt; map);  \n}\n</code></pre>\n\n<p><strong>This is android part 03</strong></p>\n\n<pre><code>\n    private Retrofit retrofit;\n    private RetrofitInterface retrofitInterface;   \n    private String BASE_URL = \"http://10.0.2.2:3000\";\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_andojs);\n\n\n\n        retrofit = new Retrofit.Builder()\n                .baseUrl(BASE_URL)\n                .addConverterFactory(GsonConverterFactory.create())\n                .build();\n\n        retrofitInterface = retrofit.create(RetrofitInterface.class);\n        handleLoginDialog();\n\n\n\n\n}\n\n}\n\n\n\n\n private void handleLoginDialog() {\n\n        View view = getLayoutInflater().inflate(R.layout.login_dialog, null);\n\n        AlertDialog.Builder builder = new AlertDialog.Builder(this);\n\n        builder.setView(view).show();\n\n        Button loginBtn = view.findViewById(R.id.login);\n        final EditText emailEdit = view.findViewById(R.id.emailEdit);\n        final EditText passwordEdit = view.findViewById(R.id.passwordEdit);\n\n        loginBtn.setOnClickListener(new View.OnClickListener() {\n            @Override\n            public void onClick(View view) {\n\n                HashMap&lt;String, String&gt; map = new HashMap&lt;&gt;();\n\n                map.put(\"email\", emailEdit.getText().toString());\n                map.put(\"password\", passwordEdit.getText().toString());\n\n                Call&lt;LoginResult&gt; call = retrofitInterface.executeLogin(map);\n\n                call.enqueue(new Callback&lt;LoginResult&gt;() {\n                    @Override\n                    public void onResponse(Call&lt;LoginResult&gt; call, Response&lt;LoginResult&gt; response) {\n\n                        if (response.code() == 200) {\n\n                            LoginResult result = response.body();\n\n\n                            AlertDialog.Builder builder1 = new AlertDialog.Builder(andojs.this);\n\n                            builder1.setTitle(result.getName());\n                            builder1.setMessage(result.getEmail());\n\n                            builder1.show();\n\n                        } else if (response.code() == 404) {\n                            Toast.makeText(andojs.this, \"Wrong Credentials\", Toast.LENGTH_SHORT).show();\n                        }\n\n                    }\n\n                    @Override\n                    public void onFailure(Call&lt;LoginResult&gt; call, Throwable t) {\n                        Toast.makeText(andojs.this, t.getMessage(),\n                                Toast.LENGTH_LONG).show();\n                    }\n                });\n\n            }\n        });\n\n    }\n</code></pre>\n"
        },
        {
            "tags": [
                "android",
                "android-fragments"
            ],
            "owner": {
                "reputation": 609,
                "user_id": 9996859,
                "user_type": "registered",
                "profile_image": "https://www.gravatar.com/avatar/70a96acd8b90c93283345107873c06d1?s=128&d=identicon&r=PG&f=1",
                "display_name": "aedgar777",
                "link": "https://stackoverflow.com/users/9996859/aedgar777"
            },
            "is_answered": false,
            "view_count": 7,
            "answer_count": 0,
            "score": 0,
            "last_activity_date": 1576867542,
            "creation_date": 1576867542,
            "question_id": 59430021,
            "link": "https://stackoverflow.com/questions/59430021/how-do-i-get-a-fragments-variable-from-a-class",
            "title": "How do I get a Fragment&#39;s variable from a class?",
            "body": "<p>I have a class whose method builds a string using the variable from a Fragment, if that Fragment is visible.</p>\n\n<p>I am currently attempting to get the fragment this way, but findFragmentById is returning null:</p>\n\n<pre><code>val fragment = (mContext as MainActivity).supportFragmentManager.findFragmentById(R.id.fragment_holder) as PaymentFragment\n\n\nval value = fragment.value\n</code></pre>\n\n<p>Here is the Fragment:</p>\n\n<pre><code>class PaymentFragment : Fragment() {\n\nprivate lateinit var value: Int\n\n}\n</code></pre>\n\n<p>What is the best way to get that fragment's value from the class?</p>\n"
        }
    ],
    answersOfAQuestions: [
        {
            "owner": {
                "reputation": 19,
                "user_id": 5830583,
                "user_type": "registered",
                "profile_image": "https://graph.facebook.com/1054352344585719/picture?type=large",
                "display_name": "Nitesh Dev Kunwar",
                "link": "https://stackoverflow.com/users/5830583/nitesh-dev-kunwar"
            },
            "is_accepted": false,
            "score": 0,
            "last_activity_date": 1556113137,
            "creation_date": 1556113137,
            "answer_id": 55831454,
            "question_id": 10407159,
            "body": "<pre><code>You need to override Activity.onActivityResult()\n\n@Override\nprotected void onActivityResult(int requestCode, int resultCode, Intent data) {\nsuper.onActivityResult(requestCode, resultCode, data);\n\nif (resultCode == RESULT_CODE_ONE) {\n\n\n   String a = data.getStringExtra(\"RESULT_CODE_ONE\");\n\n}\nelse if(resultCode == RESULT_CODE_TWO){\n\n   // b was clicked\n\n}\nelse{\n\n}\n}\n</code></pre>\n"
        },
        {
            "owner": {
                "reputation": 29080,
                "user_id": 829188,
                "user_type": "registered",
                "accept_rate": 81,
                "profile_image": "https://i.stack.imgur.com/LtiHT.jpg?s=128&g=1",
                "display_name": "Nishant",
                "link": "https://stackoverflow.com/users/829188/nishant"
            },
            "is_accepted": true,
            "score": 2387,
            "last_activity_date": 1544754809,
            "last_edit_date": 1544754809,
            "creation_date": 1335929798,
            "answer_id": 10407371,
            "question_id": 10407159,
            "body": "<p>From your <code>FirstActivity</code> call the <code>SecondActivity</code> using  <code>startActivityForResult()</code> method</p>\n\n<p>For example:</p>\n\n<pre><code>Intent i = new Intent(this, SecondActivity.class);\nstartActivityForResult(i, 1);\n</code></pre>\n\n<p>In your <code>SecondActivity</code> set the data which you want to return back to <code>FirstActivity</code>. If you don't want to return back, don't set any.</p>\n\n<p>For example: In <code>SecondActivity</code> if you want to send back data:</p>\n\n<pre><code>Intent returnIntent = new Intent();\nreturnIntent.putExtra(\"result\",result);\nsetResult(Activity.RESULT_OK,returnIntent);\nfinish();\n</code></pre>\n\n<p>If you don't want to return data:</p>\n\n<pre><code>Intent returnIntent = new Intent();\nsetResult(Activity.RESULT_CANCELED, returnIntent);\nfinish();\n</code></pre>\n\n<p>Now in your <code>FirstActivity</code> class write following code for the <code>onActivityResult()</code> method.</p>\n\n<pre><code>@Override\nprotected void onActivityResult(int requestCode, int resultCode, Intent data) {\n\n    if (requestCode == 1) {\n        if(resultCode == Activity.RESULT_OK){\n            String result=data.getStringExtra(\"result\");\n        }\n        if (resultCode == Activity.RESULT_CANCELED) {\n            //Write your code if there's no result\n        }\n    }\n}//onActivityResult\n</code></pre>\n"
        },
        {
            "owner": {
                "reputation": 5930,
                "user_id": 4700156,
                "user_type": "registered",
                "accept_rate": 64,
                "profile_image": "https://i.stack.imgur.com/rd23R.png?s=128&g=1",
                "display_name": "Rohit Singh",
                "link": "https://stackoverflow.com/users/4700156/rohit-singh"
            },
            "is_accepted": false,
            "score": 1,
            "last_activity_date": 1538828045,
            "last_edit_date": 1538828045,
            "creation_date": 1513936487,
            "answer_id": 47939405,
            "question_id": 10407159,
            "body": "<p>Very common problem in android<br>\n<strong>It can be broken down into 3 Pieces</strong><br>\n1 ) start Activity B (Happens in Activity A)<br>\n2 ) Set requested data  (Happens in activity B)<br>\n3 ) Receive requested data (Happens in activity A)          </p>\n\n<blockquote>\n  <p>1) startActivity B</p>\n</blockquote>\n\n<pre><code>Intent i = new Intent(A.this, B.class);\nstartActivity(i);\n</code></pre>\n\n<blockquote>\n  <p>2) Set requested data</p>\n</blockquote>\n\n<p>In this part, you decide whether you want to send data back or not when a particular event occurs.<br>\nEg: In activity B there is an EditText and two buttons b1, b2.<br>\nClicking on Button b1 sends data back to activity A<br>\nClicking on Button b2 does not send any data. </p>\n\n<p><strong>Sending data</strong> </p>\n\n<pre><code>b1......clickListener\n{\n   Intent resultIntent = new Intent();\n   resultIntent.putExtra(\"Your_key\",\"Your_value\");\n   setResult(RES_CODE_A,resultIntent);\n   finish();\n}\n</code></pre>\n\n<p><strong>Not sending data</strong></p>\n\n<pre><code>b2......clickListener\n    {\n       setResult(RES_CODE_B,new Intent());\n       finish();\n    }\n</code></pre>\n\n<p><strong>user clicks back button</strong><br>\nBy default, the result is set with Activity.RESULT_CANCEL response code     </p>\n\n<blockquote>\n  <p>3) Retrieve result</p>\n</blockquote>\n\n<p>For that override onActivityResult method</p>\n\n<pre><code>@Override\nprotected void onActivityResult(int requestCode, int resultCode, Intent data) {\nsuper.onActivityResult(requestCode, resultCode, data);\n\nif (resultCode == RES_CODE_A) {\n\n     // b1 was clicked \n   String x = data.getStringExtra(\"RES_CODE_A\");\n\n}\nelse if(resultCode == RES_CODE_B){\n\n   // b2 was clicked\n\n}\nelse{\n   // back button clicked \n}\n}\n</code></pre>\n"
        },
        {
            "owner": {
                "reputation": 265923,
                "user_id": 3681880,
                "user_type": "registered",
                "accept_rate": 90,
                "profile_image": "https://www.gravatar.com/avatar/3b7ad8915f552cd4e23caf38eee10030?s=128&d=identicon&r=PG",
                "display_name": "Suragch",
                "link": "https://stackoverflow.com/users/3681880/suragch"
            },
            "is_accepted": false,
            "score": 41,
            "last_activity_date": 1516211433,
            "last_edit_date": 1516211433,
            "creation_date": 1480926992,
            "answer_id": 40970087,
            "question_id": 10407159,
            "body": "<p><strong>Example</strong></p>\n\n<p>To see the entire process in context, here is a supplemental answer. See <a href=\"https://stackoverflow.com/a/40969871/3681880\">my fuller answer</a> for more explanation.</p>\n\n<p><img src=\"https://i.stack.imgur.com/Tyhf8.png\" alt=\"enter image description here\"></p>\n\n<p><em>MainActivity.java</em></p>\n\n<pre><code>public class MainActivity extends AppCompatActivity {\n\n    // Add a different request code for every activity you are starting from here\n    private static final int SECOND_ACTIVITY_REQUEST_CODE = 0;\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_main);\n    }\n\n    // \"Go to Second Activity\" button click\n    public void onButtonClick(View view) {\n\n        // Start the SecondActivity\n        Intent intent = new Intent(this, SecondActivity.class);\n        startActivityForResult(intent, SECOND_ACTIVITY_REQUEST_CODE);\n    }\n\n    // This method is called when the second activity finishes\n    @Override\n    protected void onActivityResult(int requestCode, int resultCode, Intent data) {\n        super.onActivityResult(requestCode, resultCode, data);\n\n        // check that it is the SecondActivity with an OK result\n        if (requestCode == SECOND_ACTIVITY_REQUEST_CODE) {\n            if (resultCode == RESULT_OK) { // Activity.RESULT_OK\n\n                // get String data from Intent\n                String returnString = data.getStringExtra(\"keyName\");\n\n                // set text view with string\n                TextView textView = (TextView) findViewById(R.id.textView);\n                textView.setText(returnString);\n            }\n        }\n    }\n}\n</code></pre>\n\n<p><em>SecondActivity.java</em></p>\n\n<pre><code>public class SecondActivity extends AppCompatActivity {\n\n    @Override\n    protected void onCreate(Bundle savedInstanceState) {\n        super.onCreate(savedInstanceState);\n        setContentView(R.layout.activity_second);\n    }\n\n    // \"Send text back\" button click\n    public void onButtonClick(View view) {\n\n        // get the text from the EditText\n        EditText editText = (EditText) findViewById(R.id.editText);\n        String stringToPassBack = editText.getText().toString();\n\n        // put the String to pass back into an Intent and close this activity\n        Intent intent = new Intent();\n        intent.putExtra(\"keyName\", stringToPassBack);\n        setResult(RESULT_OK, intent);\n        finish();\n    }\n}\n</code></pre>\n"
        },
        {
            "owner": {
                "reputation": 19347,
                "user_id": 4443323,
                "user_type": "registered",
                "accept_rate": 74,
                "profile_image": "https://i.stack.imgur.com/by1ko.png?s=128&g=1",
                "display_name": "Tomasz Mularczyk",
                "link": "https://stackoverflow.com/users/4443323/tomasz-mularczyk"
            },
            "is_accepted": false,
            "score": 11,
            "last_activity_date": 1445605135,
            "last_edit_date": 1495542893,
            "creation_date": 1445605135,
            "answer_id": 33302951,
            "question_id": 10407159,
            "body": "<p>For those who have problem with <a href=\"https://stackoverflow.com/questions/10564474/wrong-requestcode-in-onactivityresult\">wrong requestCode in onActivityResult</a></p>\n\n<p>If you are calling <code>startActivityForResult()</code> from your <code>Fragment</code>, the requestCode is changed by the Activity that owns the Fragment.</p>\n\n<p>If you want to get the correct resultCode in your activity try this:</p>\n\n<p>Change:</p>\n\n<p><code>startActivityForResult(intent, 1);</code> To:</p>\n\n<p><code>getActivity().startActivityForResult(intent, 1);</code></p>\n"
        },
        {
            "owner": {
                "reputation": 526,
                "user_id": 4695531,
                "user_type": "registered",
                "profile_image": "https://graph.facebook.com/1128337120517228/picture?type=large",
                "display_name": "Julian Alberto",
                "link": "https://stackoverflow.com/users/4695531/julian-alberto"
            },
            "is_accepted": false,
            "score": 43,
            "last_activity_date": 1432672847,
            "creation_date": 1432672847,
            "answer_id": 30468476,
            "question_id": 10407159,
            "body": "<p>Complementing the answer from @Nishant,the best way to return the activity result is:</p>\n\n<pre><code>Intent returnIntent = getIntent();\nreturnIntent.putExtra(\"result\",result);\nsetResult(RESULT_OK,returnIntent);\nfinish();\n</code></pre>\n\n<p>I was having problem with</p>\n\n<pre><code>new Intent();\n</code></pre>\n\n<p>Then I found out that the correct way is using </p>\n\n<pre><code>getIntent();\n</code></pre>\n\n<p>to get the current intent</p>\n"
        },
        {
            "owner": {
                "reputation": 459,
                "user_id": 4054285,
                "user_type": "registered",
                "profile_image": "https://www.gravatar.com/avatar/7fc73775015834bf2e5fcaf1663be9f5?s=128&d=identicon&r=PG&f=1",
                "display_name": "Dharmendra Pratap",
                "link": "https://stackoverflow.com/users/4054285/dharmendra-pratap"
            },
            "is_accepted": false,
            "score": 2,
            "last_activity_date": 1429531058,
            "last_edit_date": 1429531058,
            "creation_date": 1412080237,
            "answer_id": 26120912,
            "question_id": 10407159,
            "body": "<p>First you use <code>startActivityForResult()</code> with parameters in first <code>Activity</code> and if you want to send data from second <code>Activity</code> to first <code>Activity</code> then pass value using <code>Intent</code> with <code>setResult()</code> method and get that data inside <code>onActivityResult()</code> method in first <code>Activity</code>.</p>\n"
        },
        {
            "owner": {
                "reputation": 80294,
                "user_id": 1267661,
                "user_type": "registered",
                "profile_image": "https://www.gravatar.com/avatar/c2e0a13ba989e7b34e2ccc7718fa4304?s=128&d=identicon&r=PG",
                "display_name": "Sam",
                "link": "https://stackoverflow.com/users/1267661/sam"
            },
            "is_accepted": false,
            "score": 49,
            "last_activity_date": 1399957407,
            "last_edit_date": 1399957407,
            "creation_date": 1335928034,
            "answer_id": 10407192,
            "question_id": 10407159,
            "body": "<blockquote>\n  <p>How to check the result from the main activity?</p>\n</blockquote>\n\n<p>You need to override <a href=\"http://developer.android.com/reference/android/app/Activity.html#onActivityResult%28int,%20int,%20android.content.Intent%29\" rel=\"noreferrer\"><code>Activity.onActivityResult()</code></a> then check its parameters: </p>\n\n<ul>\n<li><code>requestCode</code> identifies which app returned these results. This is defined by you when you call <code>startActivityForResult()</code>.</li>\n<li><code>resultCode</code> informs you whether this app succeeded, failed, or something different</li>\n<li><code>data</code> holds any information returned by this app. This may be <code>null</code>.</li>\n</ul>\n"
        },
        {
            "owner": {
                "reputation": 309,
                "user_id": 3298759,
                "user_type": "registered",
                "profile_image": "https://graph.facebook.com/549221574/picture?type=large",
                "display_name": "DaviF",
                "link": "https://stackoverflow.com/users/3298759/davif"
            },
            "is_accepted": false,
            "score": 10,
            "last_activity_date": 1394286896,
            "creation_date": 1394286896,
            "answer_id": 22270232,
            "question_id": 10407159,
            "body": "<p>If you want to update the user interface with activity result, you can't to use <code>this.runOnUiThread(new Runnable() {}</code>\nDoing this the UI won't refresh with new value. Instead, you can do this:</p>\n\n<pre><code>@Override\nprotected void onActivityResult(int requestCode, int resultCode, Intent data) {\n    super.onActivityResult(requestCode, resultCode, data);\n\n    if (resultCode == RESULT_CANCELED) {\n        return;\n    }\n\n    global_lat = data.getDoubleExtra(\"LATITUDE\", 0);\n    global_lng = data.getDoubleExtra(\"LONGITUDE\", 0);\n    new_latlng = true;\n}\n\n@Override\nprotected void onResume() {\n    super.onResume();\n\n    if(new_latlng)\n    {\n        PhysicalTagProperties.this.setLocation(global_lat, global_lng);\n        new_latlng=false;\n    }\n}\n</code></pre>\n\n<p>This seems silly but works pretty well.</p>\n"
        }
    ]
}
